create or replace function public.create_sale_with_items(
  p_customer_id uuid,
  p_items jsonb,
  p_notes text,
  p_payment_method text
)
returns public.sales
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_worker_id uuid := auth.uid();
  new_sale public.sales;
  item jsonb;
  product_row public.products;
  item_quantity integer;
  item_unit_price numeric(12, 2);
  item_line_total numeric(12, 2);
  calculated_subtotal numeric(12, 2) := 0;
  next_order_number bigint;
begin
  if current_worker_id is null then
    raise exception 'You must be signed in to create a sale.' using errcode = '28000';
  end if;

  if p_customer_id is null then
    raise exception 'Please select a customer.' using errcode = '22023';
  end if;

  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Please add at least one product to the sale.' using errcode = '22023';
  end if;

  if p_payment_method is null or trim(p_payment_method) = '' then
    raise exception 'Please select a payment method.' using errcode = '22023';
  end if;

  perform 1
    from public.customers
   where id = p_customer_id;

  if not found then
    raise exception 'The selected customer was not found.' using errcode = '23503';
  end if;

  -- Serialize order number generation without changing products or inventory.
  perform pg_advisory_xact_lock(hashtext('eyden-trading-sales'));

  select coalesce(max(nullif(regexp_replace(order_number::text, '[^0-9]', '', 'g'), '')::bigint), 1000) + 1
    into next_order_number
    from public.sales;

  for item in select * from jsonb_array_elements(p_items)
  loop
    if item is null then
      raise exception 'One of the sale items is invalid.' using errcode = '22023';
    end if;

    if (item->>'product_id') is null then
      raise exception 'Each sale item must include a product_id.' using errcode = '22023';
    end if;

    select * into product_row
      from public.products
     where id = (item->>'product_id')::uuid;

    if not found then
      raise exception 'A selected product was not found.' using errcode = '23503';
    end if;

    item_quantity := (item->>'quantity')::integer;
    if item_quantity is null or item_quantity < 1 then
      raise exception 'Product quantity must be at least 1.' using errcode = '22023';
    end if;

    if product_row.status is distinct from 'active' then
      raise exception 'Product % is not active.', product_row.name using errcode = '22023';
    end if;

    item_unit_price := product_row.price;
    item_line_total := item_quantity * item_unit_price;
    calculated_subtotal := calculated_subtotal + item_line_total;
  end loop;

  insert into public.sales (order_number, customer_id, worker_id, payment_method, subtotal, total_amount, status, notes)
  values ('ORD-' || lpad(next_order_number::text, 4, '0'), p_customer_id, current_worker_id, p_payment_method, calculated_subtotal, calculated_subtotal, 'Completed', p_notes)
  returning * into new_sale;

  for item in select * from jsonb_array_elements(p_items)
  loop
    select * into product_row
      from public.products
     where id = (item->>'product_id')::uuid;

    item_quantity := (item->>'quantity')::integer;
    item_unit_price := product_row.price;
    item_line_total := item_quantity * item_unit_price;

    insert into public.sale_items (sale_id, product_id, quantity, unit_price, line_total)
    values (new_sale.id, product_row.id, item_quantity, item_unit_price, item_line_total);
  end loop;

  return new_sale;
end;
$$;

grant execute on function public.create_sale_with_items(uuid, jsonb, text, text) to authenticated;
