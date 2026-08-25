class Cart {
  constructor() {
    this.key = 'eyden_cart_v1';
    this.subscribers = [];
    this._load();
  }

  _load() {
    try {
      const raw = localStorage.getItem(this.key) || '{}';
      this.items = JSON.parse(raw);
    } catch (e) {
      this.items = {};
    }
  }

  _save() {
    localStorage.setItem(this.key, JSON.stringify(this.items));
    this._notify();
  }

  _notify() {
    this.subscribers.forEach(cb => cb(this.getItemsArray()));
  }

  subscribe(cb) {
    this.subscribers.push(cb);
    cb(this.getItemsArray());
    return () => {
      this.subscribers = this.subscribers.filter(x => x !== cb);
    };
  }

  getItems() {
    return this.items;
  }

  getItemsArray() {
    return Object.keys(this.items).map(sku => ({ sku, ...this.items[sku] }));
  }

  setItem(sku, data) {
    if (!data || data.quantity <= 0) {
      delete this.items[sku];
    } else {
      this.items[sku] = data;
    }
    this._save();
  }

  updateQuantity(sku, quantity) {
    const q = parseInt(quantity, 10) || 0;
    if (q <= 0) {
      delete this.items[sku];
    } else {
      this.items[sku] = this.items[sku] || { title: '', price: 0, image: '' };
      this.items[sku].quantity = q;
    }
    this._save();
  }

  clear() {
    this.items = {};
    this._save();
  }

  getTotal() {
    return this.getItemsArray().reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);
  }
}

window.Cart = new Cart();
