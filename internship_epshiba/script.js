/* ================================================================
   AuctionHub - script.js
   Complete frontend logic — no backend required
================================================================ */

// ================================================================
// STATE
// ================================================================
const state = {
  currentUser: null,
  currentPage: 'dashboard',
  selectedAuctionId: null,
  currentStep: 1,
  auctionImages: [],
  editingAuctionId: null,
  confirmCallback: null,
  viewMode: 'grid',
  darkMode: false,
  sidebarCollapsed: false,
  currentBidAuctionId: null,
  charts: {},
  countdownInterval: null,
  notifications: [
    { id: 1, text: 'New bid placed on Vintage Rolex Watch', time: '2 min ago', read: false, icon: 'fas fa-gavel' },
    { id: 2, text: 'Your auction "Antique Vase" is ending soon!', time: '15 min ago', read: false, icon: 'fas fa-clock' },
    { id: 3, text: 'You won the auction for Classic Guitar!', time: '1 hr ago', read: false, icon: 'fas fa-trophy' }
  ]
};

// ================================================================
// DATA STORAGE APPROACH (No Database Required - JavaScript Data Management)
// ================================================================

// Categories: Store in JavaScript array (id, name, icon, description)
let categories = [
  { id: 1, name: "Jewelry", icon: "fas fa-gem", description: "Diamonds, watches, fine jewelry", color: "#EC4899" },
  { id: 2, name: "Art", icon: "fas fa-palette", description: "Paintings, sculptures, rare art", color: "#7C3AED" },
  { id: 3, name: "Electronics", icon: "fas fa-laptop", description: "Gadgets, devices, tech equipment", color: "#3B82F6" },
  { id: 4, name: "Antiques", icon: "fas fa-landmark", description: "Historical items, vintage furniture", color: "#D97706" },
  { id: 5, name: "Vehicles", icon: "fas fa-car", description: "Cars, bikes, boats, aircraft", color: "#EF4444" },
  { id: 6, name: "Real Estate", icon: "fas fa-home", description: "Properties, land, luxury spaces", color: "#10B981" }
];

// Users: Store in JavaScript array (id, username, email, rating, join_date)
let users = [
  { id: 1, username: "admin_user", email: "admin@auction.com", rating: 4.9, join_date: "2024-01-01", password: "admin123", role: "admin", firstName: "Admin", lastName: "User" },
  { id: 2, username: "priya_seller", email: "seller@auction.com", rating: 4.8, join_date: "2024-03-15", password: "seller123", role: "seller", firstName: "Priya", lastName: "Sharma" },
  { id: 3, username: "rahul_buyer", email: "buyer@auction.com", rating: 4.7, join_date: "2024-05-20", password: "buyer123", role: "buyer", firstName: "Rahul", lastName: "Verma" },
  { id: 4, username: "anjali_bidder", email: "anjali@auction.com", rating: 4.6, join_date: "2024-06-01", password: "pass123", role: "buyer", firstName: "Anjali", lastName: "Singh" }
];

// User Data: Store in JavaScript object (simulated login)
let userData = {
  id: 3,
  username: "rahul_buyer",
  email: "buyer@auction.com",
  rating: 4.7,
  join_date: "2024-05-20",
  role: "buyer",
  firstName: "Rahul",
  lastName: "Verma",
  isLoggedIn: true
};

// Auctions: Store in a JavaScript array of objects (id, title, description, category, starting_price, current_price, start_date, end_date, status, seller_id, images)
let auctions = [
  { 
    id: 1, 
    title: "Vintage Rolex Watch", 
    description: "Rare 1960s Rolex Submariner in excellent condition. Original dial, bracelet intact. Papers included. Authenticated by experts.",
    category: "Jewelry",
    starting_price: 5000,
    current_price: 7200,
    start_date: "2026-06-20",
    end_date: "2026-10-30",
    status: "active",
    seller_id: 1,
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600",
      "https://images.unsplash.com/photo-1547996160-71dfabb1074a?w=600"
    ]
  },
  { 
    id: 2, 
    title: "Original Picasso Painting", 
    description: "Authentic Picasso sketch from 1947 with certificate of authenticity. Museum quality framing.",
    category: "Art",
    starting_price: 25000,
    current_price: 25000,
    start_date: "2026-06-25",
    end_date: "2026-11-02",
    status: "upcoming",
    seller_id: 2,
    images: [
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600"
    ]
  },
  {
    id: 3,
    title: "MacBook Pro 16\" M3 Max",
    description: "Apple M3 Max chip with 64GB Unified RAM, 2TB SSD storage. Space Black in mint condition with AppleCare+.",
    category: "Electronics",
    starting_price: 120000,
    current_price: 195000,
    start_date: "2026-06-01",
    end_date: "2026-10-25",
    status: "active",
    seller_id: 2,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600"
    ]
  },
  {
    id: 4,
    title: "Antique Mughal Era Brass Vase",
    description: "A stunning 17th-century Mughal-era brass vase with intricate floral engravings. Museum quality piece.",
    category: "Antiques",
    starting_price: 25000,
    current_price: 67000,
    start_date: "2026-05-10",
    end_date: "2026-10-28",
    status: "active",
    seller_id: 1,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600"
    ]
  },
  {
    id: 5,
    title: "Royal Enfield Bullet 500 Classic",
    description: "Well-maintained Royal Enfield Bullet 500 Classic. Single owner, 22,000 km driven. All documents clear.",
    category: "Vehicles",
    starting_price: 80000,
    current_price: 115000,
    start_date: "2026-06-01",
    end_date: "2026-10-22",
    status: "active",
    seller_id: 2,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
    ]
  },
  {
    id: 6,
    title: "Luxury 3BHK Sea View Apartment",
    description: "Luxurious 3BHK with panoramic sea view in premium Worli society. 2100 sq ft. Brand new, ready to occupy.",
    category: "Real Estate",
    starting_price: 5000000,
    current_price: 7200000,
    start_date: "2026-04-15",
    end_date: "2026-11-05",
    status: "active",
    seller_id: 2,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600"
    ]
  }
];

// Sample bids data: Store in a JavaScript array (id, auction_id, bidder_id, amount, timestamp, status)
let bids = [
  { id: 1, auction_id: 1, bidder_id: 2, amount: 7200, timestamp: "2026-06-21 14:30", status: "winning" },
  { id: 2, auction_id: 1, bidder_id: 3, amount: 6500, timestamp: "2026-06-21 11:15", status: "outbid" },
  { id: 3, auction_id: 3, bidder_id: 4, amount: 195000, timestamp: "2026-06-22 16:45", status: "winning" },
  { id: 4, auction_id: 4, bidder_id: 3, amount: 67000, timestamp: "2026-06-23 10:20", status: "winning" },
  { id: 5, auction_id: 5, bidder_id: 3, amount: 115000, timestamp: "2026-06-23 18:00", status: "winning" },
  { id: 6, auction_id: 6, bidder_id: 3, amount: 7200000, timestamp: "2026-06-24 12:10", status: "winning" }
];

const DB = {
  get auctions() { return auctions; },
  set auctions(v) { auctions = v; },
  get bids() { return bids; },
  set bids(v) { bids = v; },
  get categories() { return categories; },
  set categories(v) { categories = v; },
  get users() { return users; },
  set users(v) { users = v; },
  get userData() { return userData; },
  set userData(v) { userData = v; },
  watchlist: [1, 2],
  settlements: [
    { auctionId: 1, status: 'Payment Received', date: new Date().toISOString() }
  ]
};

// Normalizers ensuring bidirectional property access
function normalizeAuction(a) {
  if (!a) return a;
  if (a.starting_price === undefined) a.starting_price = a.startingPrice || 0;
  if (a.current_price === undefined) a.current_price = a.currentBid || a.starting_price;
  if (a.start_date === undefined) a.start_date = a.startDate || "";
  if (a.end_date === undefined) a.end_date = a.endDate || "";
  if (a.seller_id === undefined) a.seller_id = a.sellerId;
  
  if (!('startingPrice' in a)) {
    Object.defineProperty(a, 'startingPrice', { get() { return this.starting_price; }, set(v) { this.starting_price = v; }, configurable: true });
  }
  if (!('currentBid' in a)) {
    Object.defineProperty(a, 'currentBid', { get() { return this.current_price; }, set(v) { this.current_price = v; }, configurable: true });
  }
  if (!('startDate' in a)) {
    Object.defineProperty(a, 'startDate', { get() { return this.start_date; }, set(v) { this.start_date = v; }, configurable: true });
  }
  if (!('endDate' in a)) {
    Object.defineProperty(a, 'endDate', { get() { return this.end_date; }, set(v) { this.end_date = v; }, configurable: true });
  }
  if (!('sellerId' in a)) {
    Object.defineProperty(a, 'sellerId', { get() { return this.seller_id; }, set(v) { this.seller_id = v; }, configurable: true });
  }
  if (!a.views) a.views = 120;
  if (!a.createdAt) a.createdAt = a.start_date || new Date().toISOString();
  return a;
}

function normalizeBid(b) {
  if (!b) return b;
  if (b.auction_id === undefined) b.auction_id = b.auctionId;
  if (b.bidder_id === undefined) b.bidder_id = b.bidderId;
  if (!('auctionId' in b)) {
    Object.defineProperty(b, 'auctionId', { get() { return this.auction_id; }, set(v) { this.auction_id = v; }, configurable: true });
  }
  if (!('bidderId' in b)) {
    Object.defineProperty(b, 'bidderId', { get() { return this.bidder_id; }, set(v) { this.bidder_id = v; }, configurable: true });
  }
  return b;
}

function normalizeUser(u) {
  if (!u) return u;
  if (u.join_date === undefined) u.join_date = u.joinDate || "2024-01-01";
  if (!('joinDate' in u)) {
    Object.defineProperty(u, 'joinDate', { get() { return this.join_date; }, set(v) { this.join_date = v; }, configurable: true });
  }
  if (!u.name) u.name = u.username || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email;
  if (!u.firstName) u.firstName = (u.username || 'User').split('_')[0] || 'User';
  if (!u.lastName) u.lastName = (u.username || 'User').split('_')[1] || '';
  return u;
}

auctions.forEach(normalizeAuction);
bids.forEach(normalizeBid);
users.forEach(normalizeUser);

// ================================================================
// UTILS
// ================================================================
function generateId(prefix = 'id') {
  return prefix + Date.now() + Math.random().toString(36).substr(2, 5);
}

function formatCurrency(amount) {
  if (amount >= 10000000) return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
  if (amount >= 100000) return '₹' + (amount / 100000).toFixed(2) + ' L';
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function timeAgo(dateStr) {
  if (!dateStr) return 'recently';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return mins + ' min ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + ' hr ago';
  return Math.floor(hrs / 24) + ' days ago';
}

function getTimeRemaining(endDate) {
  const total = new Date(endDate) - Date.now();
  if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((total % (1000 * 60)) / 1000)
  };
}

function getCountdownText(endDate) {
  const t = getTimeRemaining(endDate);
  if (t.total <= 0) return '<span class="countdown-urgent">Ended</span>';
  const urgent = t.total < 2 * 60 * 60 * 1000;
  const txt = t.days > 0 ? `${t.days}d ${t.hours}h ${t.minutes}m` : t.hours > 0 ? `${t.hours}h ${t.minutes}m ${t.seconds}s` : `${t.minutes}m ${t.seconds}s`;
  return `<span class="${urgent ? 'countdown-urgent' : ''}">${txt}</span>`;
}

function getStatusBadge(status) {
  const s = String(status || '').toLowerCase();
  const map = { active: 'status-active', upcoming: 'status-upcoming', closed: 'status-closed', sold: 'status-sold', cancelled: 'status-cancelled' };
  const label = s.charAt(0).toUpperCase() + s.slice(1);
  return `<span class="status-badge ${map[s] || 'status-active'}">${label}</span>`;
}

function getBidStatusBadge(status) {
  const s = String(status || '').toLowerCase();
  const map = { placed: 'bid-status-placed', winning: 'bid-status-winning', outbid: 'bid-status-outbid', won: 'bid-status-won', lost: 'bid-status-lost' };
  const label = s.charAt(0).toUpperCase() + s.slice(1);
  return `<span class="bid-status ${map[s] || 'bid-status-placed'}">${label}</span>`;
}

function getUser(id) { 
  return users.find(u => String(u.id) === String(id)); 
}

function getAuction(id) { 
  return auctions.find(a => String(a.id) === String(id)); 
}

function getCategory(id) { 
  return categories.find(c => String(c.id) === String(id) || String(c.name).toLowerCase() === String(id).toLowerCase()); 
}

function getAuctionBids(auctionId) { 
  return bids.filter(b => String(b.auction_id || b.auctionId) === String(auctionId)).sort((a, b) => b.amount - a.amount); 
}

function getCategoryName(id) { 
  const c = getCategory(id); 
  return c ? c.name : (id || 'General'); 
}

function showToast(message, type = 'info') {
  const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', warning: 'fas fa-exclamation-triangle', info: 'fas fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="toast-icon ${icons[type]}"></i><span class="toast-msg">${message}</span>`;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function confirmAction(title, message, callback) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-message').textContent = message;
  state.confirmCallback = callback;
  document.getElementById('confirm-modal').classList.remove('hidden');
}

// ================================================================
// STORAGE (Local Storage: Optional - use localStorage to persist data)
// ================================================================
function saveToStorage() {
  try {
    localStorage.setItem('auctionhub_auctions', JSON.stringify(auctions));
    localStorage.setItem('auctionhub_bids', JSON.stringify(bids));
    localStorage.setItem('auctionhub_categories', JSON.stringify(categories));
    localStorage.setItem('auctionhub_users', JSON.stringify(users));
    localStorage.setItem('auctionhub_userdata', JSON.stringify(userData));
    localStorage.setItem('auctionhub_watchlist', JSON.stringify(DB.watchlist));
    localStorage.setItem('auctionhub_settlements', JSON.stringify(DB.settlements));
    localStorage.setItem('auctionhub_data', JSON.stringify({
      auctions, bids, users, categories, userData,
      watchlist: DB.watchlist, settlements: DB.settlements
    }));
    if (state.currentUser) localStorage.setItem('auctionhub_user', String(state.currentUser.id));
  } catch(e) {}
}

function loadFromStorage() {
  try {
    const rawData = localStorage.getItem('auctionhub_data');
    if (rawData) {
      const data = JSON.parse(rawData);
      if (data.auctions) auctions = data.auctions;
      if (data.bids) bids = data.bids;
      if (data.categories) categories = data.categories;
      if (data.users) users = data.users;
      if (data.userData) userData = data.userData;
      if (data.watchlist) DB.watchlist = data.watchlist;
      if (data.settlements) DB.settlements = data.settlements;
    }
    const sAuctions = localStorage.getItem('auctionhub_auctions');
    if (sAuctions) auctions = JSON.parse(sAuctions);
    const sBids = localStorage.getItem('auctionhub_bids');
    if (sBids) bids = JSON.parse(sBids);
    const sCategories = localStorage.getItem('auctionhub_categories');
    if (sCategories) categories = JSON.parse(sCategories);
    const sUsers = localStorage.getItem('auctionhub_users');
    if (sUsers) users = JSON.parse(sUsers);
    const sUserData = localStorage.getItem('auctionhub_userdata');
    if (sUserData) userData = JSON.parse(sUserData);

    auctions.forEach(normalizeAuction);
    bids.forEach(normalizeBid);
    users.forEach(normalizeUser);

    const uid = localStorage.getItem('auctionhub_user');
    if (uid) {
      const u = users.find(x => String(x.id) === String(uid));
      if (u) loginUser(u);
    }
  } catch(e) {}
}

// ================================================================
// AUTH
// ================================================================
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
  document.getElementById('register-form').classList.toggle('hidden', tab !== 'register');
}

function togglePasswordVisibility(id) {
  const inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pw = document.getElementById('login-password').value;
  const user = DB.users.find(u => u.email === email && u.password === pw);
  if (!user) { document.getElementById('login-error').textContent = 'Invalid email or password'; document.getElementById('login-error').classList.remove('hidden'); return; }
  loginUser(user);
}

function loginAsDemo(role) {
  const map = { admin: 'admin@auction.com', seller: 'seller@auction.com', buyer: 'buyer@auction.com' };
  const user = DB.users.find(u => u.email === map[role]);
  if (user) loginUser(user);
}

function loginUser(user) {
  state.currentUser = user;
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
  updateUserUI();
  navigate('dashboard');
  saveToStorage();
  showToast(`Welcome back, ${user.firstName}! 👋`, 'success');
}

function handleRegister(e) {
  e.preventDefault();
  const email = document.getElementById('reg-email').value.trim();
  if (DB.users.find(u => u.email === email)) {
    document.getElementById('register-error').textContent = 'Email already registered';
    document.getElementById('register-error').classList.remove('hidden');
    return;
  }
  const newUser = {
    id: generateId('u'),
    firstName: document.getElementById('reg-firstname').value.trim(),
    lastName: document.getElementById('reg-lastname').value.trim(),
    email,
    phone: document.getElementById('reg-phone').value.trim(),
    role: document.getElementById('reg-role').value,
    password: document.getElementById('reg-password').value,
    joinDate: new Date().toISOString(),
    bids: 0, wonItems: 0, listings: 0
  };
  newUser.name = `${newUser.firstName} ${newUser.lastName}`;
  DB.users.push(newUser);
  loginUser(newUser);
}

function logout() {
  confirmAction('Logout', 'Are you sure you want to logout?', () => {
    state.currentUser = null;
    localStorage.removeItem('auctionhub_user');
    document.getElementById('main-app').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('login-error').classList.add('hidden');
    showToast('Logged out successfully', 'info');
  });
}

function updateUserUI() {
  const u = state.currentUser;
  if (!u) return;
  const init = u.firstName[0].toUpperCase();
  ['sidebar-avatar', 'navbar-avatar'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = init; });
  const sn = document.getElementById('sidebar-username'); if (sn) sn.textContent = u.firstName + ' ' + u.lastName;
  const sr = document.getElementById('sidebar-userrole'); if (sr) sr.textContent = u.role;
  const nn = document.getElementById('navbar-username'); if (nn) nn.textContent = u.firstName;
  const cnt = DB.auctions.filter(a => a.status === 'Active').length;
  const badge = document.getElementById('active-auctions-badge'); if (badge) badge.textContent = cnt;
  renderNotifications();
}

// ================================================================
// NAVIGATION
// ================================================================
const pageAliasMap = {
  'bid-management': 'bids',
  'category-management': 'categories',
  'winning-settlement': 'winnings'
};

const reversePageAliasMap = {
  'bids': 'bid-management',
  'categories': 'category-management',
  'winnings': 'winning-settlement'
};

function navigate(page, e) {
  if (e && e.preventDefault) e.preventDefault();
  else if (window.event && window.event.preventDefault) window.event.preventDefault();

  const canonicalPage = pageAliasMap[page] || page;
  const legacyPage = reversePageAliasMap[page] || page;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(canonicalPage) || 
             document.getElementById(legacyPage) || 
             document.getElementById(`page-${legacyPage}`) || 
             document.getElementById(`page-${canonicalPage}`);
  if (el) el.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => {
    const pageAttr = n.dataset.page || (n.getAttribute('href') ? n.getAttribute('href').replace('#', '') : '');
    const isActive = (pageAttr === page || pageAttr === canonicalPage || pageAttr === legacyPage);
    n.classList.toggle('active', isActive);
  });

  state.currentPage = canonicalPage;
  if (window.location.hash !== '#' + canonicalPage) {
    try {
      history.replaceState(null, '', '#' + canonicalPage);
    } catch(err) {
      window.location.hash = canonicalPage;
    }
  }

  if (state.countdownInterval) { clearInterval(state.countdownInterval); state.countdownInterval = null; }
  const renders = {
    dashboard: renderDashboard,
    auctions: renderAuctions,
    'create-auction': initCreateAuction,
    bids: renderBidManagement,
    'bid-management': renderBidManagement,
    categories: renderCategories,
    'category-management': renderCategories,
    winnings: renderWinningSettlement,
    'winning-settlement': renderWinningSettlement,
    'user-dashboard': renderUserDashboard,
    reports: renderReports
  };
  if (renders[canonicalPage]) renders[canonicalPage]();
  else if (renders[legacyPage]) renders[legacyPage]();

  document.getElementById('sidebar-overlay')?.classList.add('hidden');
  if (window.innerWidth <= 768) {
    const s = document.getElementById('sidebar');
    if (s) s.classList.remove('mobile-open');
  }
  const pc = document.querySelector('.pages-container');
  if (pc) pc.scrollTop = 0;
}

function viewAuction(id) {
  state.selectedAuctionId = id;
  const a = getAuction(id);
  if (!a) return;
  // increment views
  a.views = (a.views || 0) + 1;
  navigate('auction-detail');
  renderAuctionDetail(id);
}

// ================================================================
// SIDEBAR
// ================================================================
function toggleSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  document.getElementById('sidebar').classList.toggle('collapsed', state.sidebarCollapsed);
}

function toggleMobileSidebar() {
  const s = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  const open = s.classList.toggle('mobile-open');
  ov.classList.toggle('hidden', !open);
}

// ================================================================
// DARK MODE
// ================================================================
function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  document.getElementById('dark-mode-icon').className = state.darkMode ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('auctionhub_dark', state.darkMode);
}

// ================================================================
// GLOBAL SEARCH
// ================================================================
function handleGlobalSearch(val) {
  if (!val.trim()) return;
  navigate('auctions');
  setTimeout(() => {
    const inp = document.getElementById('auction-search');
    if (inp) { inp.value = val; filterAuctions(); }
  }, 100);
}

// ================================================================
// NOTIFICATIONS
// ================================================================
function toggleNotifications() {
  document.getElementById('notifications-panel').classList.toggle('hidden');
}

function markAllRead() {
  state.notifications.forEach(n => n.read = true);
  document.getElementById('notif-badge').style.display = 'none';
  renderNotifications();
}

function renderNotifications() {
  const list = document.getElementById('notifications-list');
  const unread = state.notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notif-badge');
  badge.textContent = unread;
  badge.style.display = unread > 0 ? '' : 'none';
  if (!list) return;
  list.innerHTML = state.notifications.map(n => `
    <div class="notif-item ${n.read ? '' : 'notif-unread'}" onclick="markNotifRead(${n.id})">
      <div class="notif-icon"><i class="${n.icon}"></i></div>
      <div class="notif-content"><p>${n.text}</p><span>${n.time}</span></div>
    </div>
  `).join('') || '<div style="padding:1rem;text-align:center;color:var(--text-muted);font-size:.85rem;">No notifications</div>';
}

function markNotifRead(id) {
  const n = state.notifications.find(x => x.id === id);
  if (n) { n.read = true; renderNotifications(); }
}

// Close panels on outside click
document.addEventListener('click', (e) => {
  const panel = document.getElementById('notifications-panel');
  const btn = document.querySelector('.notification-btn');
  if (panel && !panel.contains(e.target) && btn && !btn.contains(e.target)) {
    panel.classList.add('hidden');
  }
});

// ================================================================
// DASHBOARD
// ================================================================
function renderDashboard() {
  updateCategoryCounts();
  const auctions = DB.auctions;
  const active = auctions.filter(a => a.status === 'Active').length;
  const sold = auctions.filter(a => a.status === 'Sold');
  const revenue = sold.reduce((s, a) => s + a.currentBid, 0);
  const totalBids = DB.bids.length;

  document.getElementById('dashboard-stats').innerHTML = `
    <div class="stat-card"><div class="stat-icon purple"><i class="fas fa-list"></i></div>
      <div><div class="stat-value">${auctions.length}</div><div class="stat-label">Total Auctions</div><div class="stat-change up">↑ 12% this week</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fas fa-fire"></i></div>
      <div><div class="stat-value">${active}</div><div class="stat-label">Active Auctions</div><div class="stat-change up">↑ 3 new today</div></div></div>
    <div class="stat-card"><div class="stat-icon yellow"><i class="fas fa-gavel"></i></div>
      <div><div class="stat-value">${totalBids}</div><div class="stat-label">Total Bids</div><div class="stat-change up">↑ 24% this week</div></div></div>
    <div class="stat-card"><div class="stat-icon blue"><i class="fas fa-rupee-sign"></i></div>
      <div><div class="stat-value">${formatCurrency(revenue)}</div><div class="stat-label">Total Revenue</div><div class="stat-change up">↑ 18% this month</div></div></div>
  `;

  // Active auctions list
  const activeList = auctions.filter(a => a.status === 'Active').slice(0, 5);
  document.getElementById('dashboard-active-auctions').innerHTML = activeList.length ? activeList.map(a => `
    <div style="display:flex;align-items:center;gap:.75rem;padding:.625rem 0;border-bottom:1px solid var(--border);cursor:pointer;" onclick="viewAuction('${a.id}')">
      <img src="${a.images[0]}" style="width:48px;height:36px;object-fit:cover;border-radius:6px;flex-shrink:0;" onerror="this.src='https://via.placeholder.com/48x36?text=AH'" />
      <div style="flex:1;min-width:0;"><div style="font-weight:600;font-size:.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${a.title}</div>
        <div style="font-size:.75rem;color:var(--text-muted);">${getCategoryName(a.category)}</div></div>
      <div style="text-align:right;flex-shrink:0;"><div style="font-weight:700;color:var(--primary);font-size:.9rem;">${formatCurrency(a.currentBid)}</div>
        <div style="font-size:.72rem;color:var(--text-muted);">${getAuctionBids(a.id).length} bids</div></div>
    </div>
  `).join('') : '<div class="empty-state" style="padding:1.5rem;"><i class="fas fa-inbox"></i><p>No active auctions</p></div>';

  // Recent bids
  const recentBids = [...DB.bids].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
  document.getElementById('dashboard-recent-bids').innerHTML = recentBids.length ? recentBids.map(b => {
    const auction = getAuction(b.auctionId);
    const bidder = getUser(b.bidderId);
    return `
      <div style="display:flex;align-items:center;gap:.75rem;padding:.625rem 0;border-bottom:1px solid var(--border);">
        <div class="table-avatar" style="flex-shrink:0;">${bidder ? bidder.firstName[0] : '?'}</div>
        <div style="flex:1;min-width:0;"><div style="font-size:.82rem;font-weight:600;">${bidder ? bidder.name : 'Unknown'}</div>
          <div style="font-size:.72rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${auction ? auction.title : 'Unknown'}</div></div>
        <div style="text-align:right;flex-shrink:0;"><div style="font-weight:700;color:var(--primary);font-size:.88rem;">${formatCurrency(b.amount)}</div>
          ${getBidStatusBadge(b.status)}</div>
      </div>
    `;
  }).join('') : '<div class="empty-state" style="padding:1.5rem;"><i class="fas fa-gavel"></i><p>No bids yet</p></div>';

  renderDashboardCharts();
}

function renderDashboardCharts() {
  // Activity Chart
  const labels = [];
  const bidData = [];
  const auctionData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('en-IN', { weekday: 'short' }));
    bidData.push(DB.bids.filter(b => new Date(b.timestamp).toDateString() === d.toDateString()).length);
    auctionData.push(DB.auctions.filter(a => new Date(a.createdAt).toDateString() === d.toDateString()).length);
  }
  if (state.charts.activity) state.charts.activity.destroy();
  const actCtx = document.getElementById('activityChart');
  if (actCtx) {
    state.charts.activity = new Chart(actCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Bids', data: bidData, borderColor: '#7C3AED', backgroundColor: 'rgba(124,58,237,.1)', tension: .4, fill: true, pointBackgroundColor: '#7C3AED' },
          { label: 'New Auctions', data: auctionData, borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,.1)', tension: .4, fill: true, pointBackgroundColor: '#10B981' }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
    });
  }

  // Category Doughnut
  const catData = DB.categories.map(c => DB.auctions.filter(a => a.category === c.id).length);
  const catColors = DB.categories.map(c => c.color);
  if (state.charts.category) state.charts.category.destroy();
  const catCtx = document.getElementById('categoryChart');
  if (catCtx) {
    state.charts.category = new Chart(catCtx, {
      type: 'doughnut',
      data: { labels: DB.categories.map(c => c.name), datasets: [{ data: catData, backgroundColor: catColors, borderWidth: 2 }] },
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }, cutout: '65%' }
    });
  }
}

function updateActivityChart(days) {
  const labels = [];
  const bidData = [];
  for (let i = parseInt(days) - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }));
    bidData.push(DB.bids.filter(b => new Date(b.timestamp).toDateString() === d.toDateString()).length);
  }
  if (state.charts.activity) {
    state.charts.activity.data.labels = labels;
    state.charts.activity.data.datasets[0].data = bidData;
    state.charts.activity.update();
  }
}

// ================================================================
// AUCTIONS LISTING
// ================================================================
function renderAuctions() {
  populateCategoryFilter();
  updateAuctionBidAuctionFilter();
  filterAuctions();
}

function populateCategoryFilter() {
  const sel = document.getElementById('filter-category');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = '<option value="">All Categories</option>' + DB.categories.map(c => `<option value="${c.id}" ${cur === c.id ? 'selected' : ''}>${c.name}</option>`).join('');
}

function updateAuctionBidAuctionFilter() {
  const sel = document.getElementById('bid-filter-auction');
  if (!sel) return;
  sel.innerHTML = '<option value="">All Auctions</option>' + DB.auctions.map(a => `<option value="${a.id}">${a.title.substring(0, 40)}</option>`).join('');
}

function filterAuctions() {
  const q = (document.getElementById('auction-search')?.value || '').toLowerCase();
  const cat = document.getElementById('filter-category')?.value || '';
  const status = document.getElementById('filter-status')?.value || '';
  const sort = document.getElementById('filter-sort')?.value || 'newest';

  let list = DB.auctions.filter(a => {
    const matchQ = !q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
    const matchCat = !cat || a.category === cat;
    const matchStatus = !status || a.status === status;
    return matchQ && matchCat && matchStatus;
  });

  if (sort === 'ending-soon') list.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
  else if (sort === 'price-low') list.sort((a, b) => a.currentBid - b.currentBid);
  else if (sort === 'price-high') list.sort((a, b) => b.currentBid - a.currentBid);
  else if (sort === 'most-bids') list.sort((a, b) => getAuctionBids(b.id).length - getAuctionBids(a.id).length);
  else list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const grid = document.getElementById('auctions-grid');
  const noEl = document.getElementById('no-auctions');
  if (!list.length) { grid.innerHTML = ''; noEl.classList.remove('hidden'); return; }
  noEl.classList.add('hidden');
  grid.className = `auctions-grid ${state.viewMode === 'list' ? 'list-view' : ''}`;
  grid.innerHTML = list.map(a => renderAuctionCard(a)).join('');
  startCountdownUpdates();
}

function renderAuctionCard(a) {
  const bids = getAuctionBids(a.id).length;
  const inWatch = DB.watchlist.includes(a.id);
  const listClass = state.viewMode === 'list' ? 'list-view' : '';
  return `
    <div class="auction-card ${listClass}" onclick="viewAuction('${a.id}')">
      <div class="auction-card-img">
        <img src="${a.images[0] || 'https://via.placeholder.com/400x225?text=No+Image'}" alt="${a.title}" onerror="this.src='https://via.placeholder.com/400x225?text=AuctionHub'" />
        <div class="auction-card-status">${getStatusBadge(a.status)}</div>
        <button class="auction-card-watchlist ${inWatch ? 'in-watchlist' : ''}" onclick="toggleWatchlist(event,'${a.id}')" title="${inWatch ? 'Remove from watchlist' : 'Add to watchlist'}">
          <i class="${inWatch ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="auction-card-body">
        <div class="auction-card-category">${getCategoryName(a.category)}</div>
        <div class="auction-card-title">${a.title}</div>
        <div class="auction-card-price">
          <div><div class="current-bid-label">Current Bid</div><div class="current-bid-amount">${formatCurrency(a.currentBid)}</div></div>
          <div class="bid-count"><i class="fas fa-gavel"></i> ${bids} bids</div>
        </div>
        <div class="auction-countdown" id="countdown-${a.id}">
          <i class="fas fa-clock"></i>${a.status === 'Active' ? getCountdownText(a.endDate) : a.status === 'Upcoming' ? 'Starts ' + formatDate(a.startDate) : a.status}
        </div>
        <div class="auction-card-footer">
          <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();viewAuction('${a.id}')"><i class="fas fa-eye"></i> View</button>
          ${a.status === 'Active' ? `<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openBidModal('${a.id}')"><i class="fas fa-gavel"></i> Bid</button>` : ''}
        </div>
      </div>
    </div>
  `;
}

function setViewMode(mode) {
  state.viewMode = mode;
  document.getElementById('grid-view-btn').classList.toggle('active', mode === 'grid');
  document.getElementById('list-view-btn').classList.toggle('active', mode === 'list');
  filterAuctions();
}

function startCountdownUpdates() {
  if (state.countdownInterval) clearInterval(state.countdownInterval);
  state.countdownInterval = setInterval(() => {
    DB.auctions.filter(a => a.status === 'Active').forEach(a => {
      const el = document.getElementById(`countdown-${a.id}`);
      if (el) el.innerHTML = `<i class="fas fa-clock"></i>${getCountdownText(a.endDate)}`;
    });
  }, 1000);
}

// ================================================================
// WATCHLIST
// ================================================================
function toggleWatchlist(e, auctionId) {
  e.stopPropagation();
  const idx = DB.watchlist.indexOf(auctionId);
  if (idx > -1) { DB.watchlist.splice(idx, 1); showToast('Removed from watchlist', 'info'); }
  else { DB.watchlist.push(auctionId); showToast('Added to watchlist ❤️', 'success'); }
  saveToStorage();
  filterAuctions();
}

// ================================================================
// AUCTION DETAIL
// ================================================================
function renderAuctionDetail(id) {
  const a = getAuction(id);
  if (!a) return;
  const bids = getAuctionBids(id);
  const seller = getUser(a.sellerId);
  const canBid = state.currentUser && a.status === 'Active' && state.currentUser.id !== a.sellerId;

  document.getElementById('auction-detail-actions').innerHTML = `
    <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
      ${getStatusBadge(a.status)}
      ${canBid ? `<button class="btn btn-primary" onclick="openBidModal('${a.id}')"><i class="fas fa-gavel"></i> Place Bid</button>` : ''}
      ${state.currentUser && (state.currentUser.id === a.sellerId || state.currentUser.role === 'admin') ? `
        <button class="btn btn-outline" onclick="editAuction('${a.id}')"><i class="fas fa-edit"></i> Edit</button>
        <button class="btn btn-danger" onclick="deleteAuction('${a.id}')"><i class="fas fa-trash"></i> Delete</button>
      ` : ''}
    </div>
  `;

  const imgs = a.images.length ? a.images : ['https://via.placeholder.com/600x450?text=No+Image'];
  document.getElementById('auction-detail-content').innerHTML = `
    <div class="auction-detail-grid">
      <div>
        <div class="auction-images">
          <div class="main-image"><img id="main-auction-img" src="${imgs[0]}" alt="${a.title}" onerror="this.src='https://via.placeholder.com/600x450?text=AuctionHub'" /></div>
          ${imgs.length > 1 ? `<div class="image-thumbnails">${imgs.map((img, i) => `<img src="${img}" class="${i === 0 ? 'active' : ''}" onclick="switchImage('${img}', this)" onerror="this.src='https://via.placeholder.com/65x50?text=AH'" />`).join('')}</div>` : ''}
        </div>
        <div class="auction-detail-info" style="margin-top:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:.5rem;">
            <span style="font-size:.75rem;color:var(--primary);font-weight:700;text-transform:uppercase;">${getCategoryName(a.category)}</span>
            <span style="font-size:.75rem;color:var(--text-muted);">${a.views} views</span>
          </div>
          <h2>${a.title}</h2>
          <p>${a.description}</p>
          <div class="detail-tags" style="margin-top:.75rem;">
            <span class="detail-tag"><i class="fas fa-map-marker-alt"></i> ${a.location || 'India'}</span>
            <span class="detail-tag"><i class="fas fa-star"></i> Condition: ${a.condition}</span>
            <span class="detail-tag"><i class="fas fa-calendar"></i> Listed: ${formatDate(a.createdAt)}</span>
            ${a.reservePrice ? `<span class="detail-tag"><i class="fas fa-shield-alt"></i> Reserve: ${formatCurrency(a.reservePrice)}</span>` : ''}
            ${a.buyNowPrice ? `<span class="detail-tag" style="background:var(--primary-light);color:var(--primary);font-weight:700;cursor:pointer;" onclick="openBidModal('${a.id}')"><i class="fas fa-bolt"></i> Buy Now: ${formatCurrency(a.buyNowPrice)}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="auction-detail-side">
        <div class="bid-box">
          <div class="bid-box-header">
            <div style="font-size:.75rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:.05em;">Current Bid</div>
            <div class="current-bid-big">${formatCurrency(a.currentBid)}</div>
            <div class="bid-box-meta">
              <span><i class="fas fa-gavel"></i> ${bids.length} bids</span>
              <span><i class="fas fa-eye"></i> ${a.views} views</span>
            </div>
          </div>
          ${canBid ? `<div class="bid-box-actions"><button class="btn btn-primary" onclick="openBidModal('${a.id}')"><i class="fas fa-gavel"></i> Place Bid</button>
            <button class="btn btn-outline" onclick="toggleWatchlist(event,'${a.id}')"><i class="${DB.watchlist.includes(a.id) ? 'fas' : 'far'} fa-heart"></i></button></div>` : ''}
          <div class="bid-history">
            <h4>Bid History</h4>
            ${bids.length ? bids.slice(0, 8).map((b, i) => {
              const bidder = getUser(b.bidderId);
              return `<div class="bid-history-item ${i === 0 ? 'winning' : ''}">
                <span>${bidder ? bidder.firstName : '?'} ${bidder ? bidder.lastName[0] + '.' : ''}</span>
                <span>${formatCurrency(b.amount)}</span>
                <span style="font-size:.7rem;color:var(--text-muted);">${timeAgo(b.timestamp)}</span>
              </div>`;
            }).join('') : '<p style="text-align:center;color:var(--text-muted);font-size:.8rem;padding:.5rem;">No bids yet. Be the first!</p>'}
          </div>
        </div>
        <div class="countdown-box">
          <h4>${a.status === 'Active' ? 'Time Remaining' : a.status === 'Upcoming' ? 'Starts In' : 'Auction ' + a.status}</h4>
          <div id="detail-countdown">${renderCountdownBox(a)}</div>
        </div>
        <div class="seller-info">
          <h4>Seller Information</h4>
          <div class="seller-profile">
            <div class="seller-avatar">${seller ? seller.firstName[0] : '?'}</div>
            <div><div class="seller-name">${seller ? seller.name : 'Unknown'}</div><div class="seller-joined">Member since ${seller ? formatDate(seller.joinDate) : 'N/A'}</div></div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (a.status === 'Active' || a.status === 'Upcoming') {
    state.countdownInterval = setInterval(() => {
      const el = document.getElementById('detail-countdown');
      if (el) el.innerHTML = renderCountdownBox(a);
    }, 1000);
  }
}

function renderCountdownBox(a) {
  const src = a.status === 'Upcoming' ? a.startDate : a.endDate;
  const t = getTimeRemaining(src);
  if (t.total <= 0 || (a.status !== 'Active' && a.status !== 'Upcoming')) {
    return `<div class="countdown-ended">${a.status}</div>`;
  }
  return `<div class="countdown-segments">
    <div class="countdown-segment"><div class="countdown-number">${String(t.days).padStart(2,'0')}</div><div class="countdown-unit">Days</div></div>
    <div class="countdown-segment"><div class="countdown-number">${String(t.hours).padStart(2,'0')}</div><div class="countdown-unit">Hours</div></div>
    <div class="countdown-segment"><div class="countdown-number">${String(t.minutes).padStart(2,'0')}</div><div class="countdown-unit">Mins</div></div>
    <div class="countdown-segment"><div class="countdown-number">${String(t.seconds).padStart(2,'0')}</div><div class="countdown-unit">Secs</div></div>
  </div>`;
}

function switchImage(src, el) {
  document.getElementById('main-auction-img').src = src;
  document.querySelectorAll('.image-thumbnails img').forEach(img => img.classList.remove('active'));
  el.classList.add('active');
}

function editAuction(id) {
  state.editingAuctionId = id;
  const a = getAuction(id);
  if (!a) return;
  navigate('create-auction');
  document.getElementById('create-auction-title').textContent = 'Edit Auction';
  setTimeout(() => {
    document.getElementById('auction-title').value = a.title;
    document.getElementById('auction-description').value = a.description;
    document.getElementById('auction-category').value = a.category;
    document.getElementById('auction-condition').value = a.condition;
    document.getElementById('auction-location').value = a.location || '';
    document.getElementById('auction-starting-price').value = a.startingPrice;
    document.getElementById('auction-reserve-price').value = a.reservePrice || '';
    document.getElementById('auction-bid-increment').value = a.bidIncrement || 100;
    document.getElementById('auction-buy-now').value = a.buyNowPrice || '';
    document.getElementById('auction-start-date').value = a.startDate.slice(0, 16);
    document.getElementById('auction-end-date').value = a.endDate.slice(0, 16);
    state.auctionImages = [...a.images];
    renderImagePreviews();
    updateCalc();
  }, 100);
}

function deleteAuction(id) {
  confirmAction('Delete Auction', 'Are you sure you want to delete this auction? This cannot be undone.', () => {
    auctions = auctions.filter(a => String(a.id) !== String(id));
    bids = bids.filter(b => String(b.auction_id || b.auctionId) !== String(id));
    saveToStorage();
    showToast('Auction deleted successfully', 'success');
    navigate('auctions');
  });
}

// ================================================================
// CREATE AUCTION (Multi-step)
// ================================================================
function initCreateAuction() {
  if (!state.editingAuctionId) {
    state.currentStep = 1;
    state.auctionImages = [];
    document.getElementById('create-auction-title').textContent = 'Create New Auction';
    ['auction-title','auction-description','auction-location','auction-starting-price',
     'auction-reserve-price','auction-buy-now','auction-start-date','auction-end-date',
     'image-url-input'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    document.getElementById('auction-bid-increment').value = '100';
    document.getElementById('image-preview-grid').innerHTML = '';
    document.getElementById('calc-suggestions').innerHTML = '';
    document.getElementById('calc-starting-price').textContent = '₹0';
  }
  // Populate category dropdown
  const sel = document.getElementById('auction-category');
  if (sel) {
    sel.innerHTML = '<option value="">Select Category</option>' + DB.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    if (state.editingAuctionId) { const a = getAuction(state.editingAuctionId); if (a) sel.value = a.category; }
  }
  goToStep(state.currentStep || 1);
}

function goToStep(step) {
  state.currentStep = step;
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${step}`)?.classList.add('active');
  document.querySelectorAll('.step').forEach(s => {
    const n = parseInt(s.dataset.step);
    s.classList.toggle('active', n === step);
    s.classList.toggle('completed', n < step);
  });
  for (let i = 1; i <= 3; i++) {
    const line = document.getElementById(`line-${i}-${i+1}`);
    if (line) line.classList.toggle('completed', i < step);
  }
  if (step === 4) renderReview();
}

function nextStep(step) {
  if (step > state.currentStep) {
    if (step === 2 && !validateStep1()) return;
    if (step === 3 && !validateStep2()) return;
  }
  goToStep(step);
}

function validateStep1() {
  const title = document.getElementById('auction-title').value.trim();
  const desc = document.getElementById('auction-description').value.trim();
  const cat = document.getElementById('auction-category').value;
  if (!title) { showToast('Please enter auction title', 'error'); return false; }
  if (!desc) { showToast('Please enter description', 'error'); return false; }
  if (!cat) { showToast('Please select a category', 'error'); return false; }
  return true;
}

function validateStep2() {
  const sp = document.getElementById('auction-starting-price').value;
  const sd = document.getElementById('auction-start-date').value;
  const ed = document.getElementById('auction-end-date').value;
  if (!sp || sp <= 0) { showToast('Please enter valid starting price', 'error'); return false; }
  if (!sd) { showToast('Please select start date', 'error'); return false; }
  if (!ed) { showToast('Please select end date', 'error'); return false; }
  if (new Date(ed) <= new Date(sd)) { showToast('End date must be after start date', 'error'); return false; }
  return true;
}

function updateCalc() {
  const sp = parseFloat(document.getElementById('auction-starting-price').value) || 0;
  document.getElementById('calc-starting-price').textContent = formatCurrency(sp);
  const increments = [sp * 0.02, sp * 0.05, sp * 0.1].filter(x => x > 0);
  document.getElementById('calc-suggestions').innerHTML = increments.length
    ? increments.map(x => `<span class="calc-suggestion">${formatCurrency(Math.round(x))}</span>`).join('')
    : '<span style="font-size:.78rem;color:var(--text-muted);">Enter a starting price to see suggestions</span>';
}

function handleImageUpload(e) {
  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = ev => { state.auctionImages.push(ev.target.result); renderImagePreviews(); };
    reader.readAsDataURL(file);
  });
}

function addImageUrl() {
  const url = document.getElementById('image-url-input').value.trim();
  if (!url) { showToast('Please enter an image URL', 'warning'); return; }
  state.auctionImages.push(url);
  renderImagePreviews();
  document.getElementById('image-url-input').value = '';
  showToast('Image added!', 'success');
}

function removeImage(idx) {
  state.auctionImages.splice(idx, 1);
  renderImagePreviews();
}

function renderImagePreviews() {
  document.getElementById('image-preview-grid').innerHTML = state.auctionImages.map((img, i) => `
    <div class="preview-image">
      <img src="${img}" onerror="this.src='https://via.placeholder.com/90x90?text=Err'" />
      <button onclick="removeImage(${i})"><i class="fas fa-times"></i></button>
    </div>
  `).join('');
}

function renderReview() {
  const a = {
    title: document.getElementById('auction-title').value,
    description: document.getElementById('auction-description').value,
    category: document.getElementById('auction-category').value,
    condition: document.getElementById('auction-condition').value,
    location: document.getElementById('auction-location').value,
    startingPrice: document.getElementById('auction-starting-price').value,
    reservePrice: document.getElementById('auction-reserve-price').value,
    bidIncrement: document.getElementById('auction-bid-increment').value,
    buyNowPrice: document.getElementById('auction-buy-now').value,
    startDate: document.getElementById('auction-start-date').value,
    endDate: document.getElementById('auction-end-date').value
  };
  document.getElementById('auction-review-content').innerHTML = `
    <div class="review-grid">
      <div class="review-item"><label>Title</label><p>${a.title}</p></div>
      <div class="review-item"><label>Category</label><p>${getCategoryName(a.category)}</p></div>
      <div class="review-item"><label>Condition</label><p>${a.condition}</p></div>
      <div class="review-item"><label>Location</label><p>${a.location || 'Not specified'}</p></div>
      <div class="review-item"><label>Starting Price</label><p>${formatCurrency(a.startingPrice)}</p></div>
      <div class="review-item"><label>Reserve Price</label><p>${a.reservePrice ? formatCurrency(a.reservePrice) : 'None'}</p></div>
      <div class="review-item"><label>Bid Increment</label><p>${formatCurrency(a.bidIncrement)}</p></div>
      <div class="review-item"><label>Buy Now Price</label><p>${a.buyNowPrice ? formatCurrency(a.buyNowPrice) : 'None'}</p></div>
      <div class="review-item"><label>Start Date</label><p>${formatDateTime(a.startDate)}</p></div>
      <div class="review-item"><label>End Date</label><p>${formatDateTime(a.endDate)}</p></div>
    </div>
    <div class="review-item" style="margin-bottom:.75rem;"><label>Description</label><p style="font-weight:400;line-height:1.6;">${a.description}</p></div>
    ${state.auctionImages.length ? `<div class="review-item"><label>Images (${state.auctionImages.length})</label><div class="review-images">${state.auctionImages.map(img => `<img src="${img}" onerror="this.src='https://via.placeholder.com/80x60'" />`).join('')}</div></div>` : '<p style="color:var(--text-muted);font-size:.82rem;">⚠️ No images uploaded</p>'}
  `;
}

function submitAuction() {
  const now = new Date();
  const sd = new Date(document.getElementById('auction-start-date').value);
  const status = sd > now ? 'Upcoming' : 'Active';
  const sp = parseFloat(document.getElementById('auction-starting-price').value);
  const imgs = state.auctionImages.length ? state.auctionImages : ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'];

  if (state.editingAuctionId) {
    const a = getAuction(state.editingAuctionId);
    if (a) {
      a.title = document.getElementById('auction-title').value;
      a.description = document.getElementById('auction-description').value;
      a.category = document.getElementById('auction-category').value;
      a.condition = document.getElementById('auction-condition').value;
      a.location = document.getElementById('auction-location').value;
      a.starting_price = sp;
      a.startingPrice = sp;
      a.current_price = Math.max(a.current_price || 0, sp);
      a.currentBid = Math.max(a.currentBid || 0, sp);
      a.reservePrice = parseFloat(document.getElementById('auction-reserve-price').value) || null;
      a.bidIncrement = parseFloat(document.getElementById('auction-bid-increment').value) || 100;
      a.buyNowPrice = parseFloat(document.getElementById('auction-buy-now').value) || null;
      a.start_date = document.getElementById('auction-start-date').value;
      a.startDate = document.getElementById('auction-start-date').value;
      a.end_date = document.getElementById('auction-end-date').value;
      a.endDate = document.getElementById('auction-end-date').value;
      a.images = imgs;
      a.status = status.toLowerCase();
      showToast('Auction updated successfully! ✅', 'success');
    }
    state.editingAuctionId = null;
  } else {
    const nextId = auctions.length ? Math.max(...auctions.map(a => Number(a.id) || 0)) + 1 : 1;
    const newAuction = {
      id: nextId,
      title: document.getElementById('auction-title').value,
      description: document.getElementById('auction-description').value,
      category: document.getElementById('auction-category').value,
      starting_price: sp,
      current_price: sp,
      start_date: document.getElementById('auction-start-date').value,
      end_date: document.getElementById('auction-end-date').value,
      status: status.toLowerCase(),
      seller_id: state.currentUser ? state.currentUser.id : 1,
      images: imgs,
      condition: document.getElementById('auction-condition').value,
      location: document.getElementById('auction-location').value,
      reservePrice: parseFloat(document.getElementById('auction-reserve-price').value) || null,
      bidIncrement: parseFloat(document.getElementById('auction-bid-increment').value) || 100,
      buyNowPrice: parseFloat(document.getElementById('auction-buy-now').value) || null,
      winnerId: null,
      views: 0,
      createdAt: new Date().toISOString()
    };
    normalizeAuction(newAuction);
    auctions.unshift(newAuction);
    state.notifications.unshift({ id: Date.now(), text: `Your auction "${document.getElementById('auction-title').value}" is now live!`, time: 'just now', read: false, icon: 'fas fa-check-circle' });
    showToast('Auction created successfully! 🎉', 'success');
  }
  saveToStorage();
  navigate('auctions');
}

// ================================================================
// BID MODAL
// ================================================================
function openBidModal(auctionId) {
  const a = getAuction(auctionId);
  if (!a) return;
  if (!state.currentUser) { showToast('Please login to bid', 'warning'); return; }
  if (String(a.status).toLowerCase() !== 'active') { showToast('This auction is not active', 'warning'); return; }
  state.currentBidAuctionId = auctionId;
  const currentAmt = a.current_price || a.currentBid || 0;
  const minBid = currentAmt + (a.bidIncrement || 100);
  document.getElementById('bid-auction-info').innerHTML = `
    <div class="bid-auction-summary">
      <h4>${a.title}</h4>
      <p>Current bid: <strong>${formatCurrency(currentAmt)}</strong> &nbsp;|&nbsp; ${getAuctionBids(auctionId).length} bids</p>
    </div>
  `;
  document.getElementById('min-bid-hint').textContent = `Minimum bid: ${formatCurrency(minBid)}`;
  document.getElementById('bid-increment-hint').textContent = `Increment: ${formatCurrency(a.bidIncrement || 100)}`;
  document.getElementById('bid-amount-input').value = minBid;
  document.getElementById('bid-amount-input').min = minBid;
  document.getElementById('auto-bid-check').checked = false;
  document.getElementById('auto-bid-max').classList.add('hidden');
  // Quick bid buttons
  const increments = [1, 2, 5].map(m => currentAmt + m * (a.bidIncrement || 100));
  document.getElementById('quick-bid-btns').innerHTML = increments.map(amt =>
    `<button class="quick-bid-btn" onclick="document.getElementById('bid-amount-input').value=${amt}">${formatCurrency(amt)}</button>`
  ).join('');
  document.getElementById('place-bid-modal').classList.remove('hidden');
}

function closeBidModal(e) { if (e.target === e.currentTarget) closeBidModalBtn(); }
function closeBidModalBtn() { document.getElementById('place-bid-modal').classList.add('hidden'); }

function toggleAutoBid() {
  const checked = document.getElementById('auto-bid-check').checked;
  document.getElementById('auto-bid-max').classList.toggle('hidden', !checked);
}

function submitBid() {
  const auctionId = state.currentBidAuctionId;
  const a = getAuction(auctionId);
  if (!a) return;
  const amount = parseFloat(document.getElementById('bid-amount-input').value);
  const currentAmt = a.current_price || a.currentBid || 0;
  const minBid = currentAmt + (a.bidIncrement || 100);
  if (!amount || amount < minBid) { showToast(`Minimum bid is ${formatCurrency(minBid)}`, 'error'); return; }
  if (!state.currentUser) { showToast('Please login to bid', 'warning'); return; }

  // Mark all previous winning bids as outbid
  bids.filter(b => String(b.auction_id || b.auctionId) === String(auctionId) && String(b.status).toLowerCase() === 'winning')
      .forEach(b => b.status = 'outbid');

  // Add new bid
  const nextBidId = bids.length ? Math.max(...bids.map(b => Number(b.id) || 0)) + 1 : 1;
  const newBid = { 
    id: nextBidId, 
    auction_id: a.id, 
    bidder_id: state.currentUser.id, 
    amount, 
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), 
    status: 'winning', 
    autoBid: false 
  };
  normalizeBid(newBid);
  bids.push(newBid);
  a.current_price = amount;
  a.currentBid = amount;

  // Handle auto-bid
  const autoBidEnabled = document.getElementById('auto-bid-check').checked;
  if (autoBidEnabled) {
    const maxAmount = parseFloat(document.getElementById('auto-bid-max-amount').value);
    if (maxAmount && maxAmount > amount) {
      state.autoBidSettings[auctionId] = { userId: state.currentUser.id, maxAmount };
      showToast(`Auto-bid set up to ${formatCurrency(maxAmount)}! 🤖`, 'info');
    }
  }

  state.notifications.unshift({ id: Date.now(), text: `Your bid of ${formatCurrency(amount)} on "${a.title}" was placed!`, time: 'just now', read: false, icon: 'fas fa-gavel' });
  saveToStorage();
  closeBidModalBtn();
  showToast(`Bid of ${formatCurrency(amount)} placed successfully! 🎉`, 'success');
  updateUserUI();

  // Refresh current view
  if (state.currentPage === 'auctions') filterAuctions();
  if (state.currentPage === 'auction-detail') renderAuctionDetail(auctionId);
}

// ================================================================
// BID MANAGEMENT
// ================================================================
function renderBidManagement() {
  updateCategoryCounts();
  const bids = DB.bids;
  const winning = bids.filter(b => b.status === 'Winning').length;
  const totalValue = bids.reduce((s, b) => s + b.amount, 0);

  document.getElementById('bid-stats').innerHTML = `
    <div class="stat-card"><div class="stat-icon purple"><i class="fas fa-gavel"></i></div><div><div class="stat-value">${bids.length}</div><div class="stat-label">Total Bids</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fas fa-trophy"></i></div><div><div class="stat-value">${winning}</div><div class="stat-label">Winning Bids</div></div></div>
    <div class="stat-card"><div class="stat-icon yellow"><i class="fas fa-rupee-sign"></i></div><div><div class="stat-value">${formatCurrency(totalValue)}</div><div class="stat-label">Total Bid Value</div></div></div>
    <div class="stat-card"><div class="stat-icon blue"><i class="fas fa-users"></i></div><div><div class="stat-value">${new Set(bids.map(b=>b.bidderId)).size}</div><div class="stat-label">Unique Bidders</div></div></div>
  `;

  updateAuctionBidAuctionFilter();
  const statusFilter = document.getElementById('bid-filter-status')?.value || '';
  const auctionFilter = document.getElementById('bid-filter-auction')?.value || '';
  let filtered = bids.filter(b => (!statusFilter || b.status === statusFilter) && (!auctionFilter || b.auctionId === auctionFilter));
  filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  document.getElementById('bids-table-body').innerHTML = filtered.length ? filtered.map(b => {
    const bidder = getUser(b.bidderId);
    const auction = getAuction(b.auctionId);
    return `<tr>
      <td><div class="table-user"><div class="table-avatar">${bidder ? bidder.firstName[0] : '?'}</div><span>${bidder ? bidder.name : 'Unknown'}</span></div></td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${auction ? auction.title : 'N/A'}</td>
      <td style="font-weight:700;color:var(--primary);">${formatCurrency(b.amount)}</td>
      <td>${timeAgo(b.timestamp)}</td>
      <td>${getBidStatusBadge(b.status)}</td>
      <td><div class="table-actions">
        ${auction ? `<button class="btn btn-outline btn-sm" onclick="viewAuction('${b.auctionId}')"><i class="fas fa-eye"></i></button>` : ''}
      </div></td>
    </tr>`;
  }).join('') : '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted);">No bids found</td></tr>';
}

// ================================================================
// CATEGORY MANAGEMENT
// ================================================================
function updateCategoryCounts() {
  DB.categories.forEach(c => { c.count = DB.auctions.filter(a => a.category === c.id).length; });
}

function renderCategories() {
  updateCategoryCounts();
  document.getElementById('categories-grid').innerHTML = DB.categories.map(c => `
    <div class="category-card">
      <div class="category-icon" style="background:${c.color}20;color:${c.color};"><i class="${c.icon}"></i></div>
      <div class="category-info">
        <div class="category-name">${c.name}</div>
        <div class="category-desc">${c.description}</div>
        <div class="category-count">${c.count} auction${c.count !== 1 ? 's' : ''}</div>
      </div>
      <div class="category-actions">
        <button class="btn btn-outline btn-sm btn-icon" onclick="editCategory('${c.id}')" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteCategory('${c.id}')" title="Delete"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function openAddCategoryModal() {
  document.getElementById('category-modal-title').textContent = 'Add Category';
  document.getElementById('edit-category-id').value = '';
  ['category-name','category-description','category-icon'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.getElementById('category-color').value = '#7C3AED';
  document.getElementById('category-modal').classList.remove('hidden');
}

function editCategory(id) {
  const c = getCategory(id);
  if (!c) return;
  document.getElementById('category-modal-title').textContent = 'Edit Category';
  document.getElementById('edit-category-id').value = id;
  document.getElementById('category-name').value = c.name;
  document.getElementById('category-icon').value = c.icon;
  document.getElementById('category-description').value = c.description;
  document.getElementById('category-color').value = c.color;
  document.getElementById('category-modal').classList.remove('hidden');
}

function saveCategory() {
  const id = document.getElementById('edit-category-id').value;
  const name = document.getElementById('category-name').value.trim();
  if (!name) { showToast('Please enter category name', 'error'); return; }
  const data = {
    name,
    icon: document.getElementById('category-icon').value.trim() || 'fas fa-tag',
    description: document.getElementById('category-description').value.trim(),
    color: document.getElementById('category-color').value
  };
  if (id) {
    const c = getCategory(id);
    if (c) Object.assign(c, data);
    showToast('Category updated!', 'success');
  } else {
    categories.push({ id: categories.length ? Math.max(...categories.map(c => Number(c.id) || 0)) + 1 : 1, count: 0, ...data });
    showToast('Category added!', 'success');
  }
  saveToStorage();
  closeCategoryModalBtn();
  renderCategories();
}

function deleteCategory(id) {
  const usedIn = auctions.filter(a => String(a.category).toLowerCase() === String(id).toLowerCase() || String(a.category) === String(id)).length;
  if (usedIn > 0) { showToast(`Cannot delete: ${usedIn} auction(s) use this category`, 'error'); return; }
  confirmAction('Delete Category', 'Are you sure you want to delete this category?', () => {
    categories = categories.filter(c => String(c.id) !== String(id));
    saveToStorage();
    renderCategories();
    showToast('Category deleted!', 'success');
  });
}

function closeCategoryModal(e) { if (e.target === e.currentTarget) closeCategoryModalBtn(); }
function closeCategoryModalBtn() { document.getElementById('category-modal').classList.add('hidden'); }

// ================================================================
// USER DASHBOARD
// ================================================================
function renderUserDashboard() {
  const u = state.currentUser;
  if (!u) return;
  const myBids = DB.bids.filter(b => b.bidderId === u.id);
  const wonItems = myBids.filter(b => b.status === 'Won').length;
  const myListings = DB.auctions.filter(a => a.sellerId === u.id).length;

  document.getElementById('user-profile-card').innerHTML = `
    <div class="user-profile-banner">
      <div class="profile-avatar-lg">${u.firstName[0]}</div>
      <div>
        <div class="profile-name">${u.name}</div>
        <div class="profile-email">${u.email} &nbsp;•&nbsp; <span style="text-transform:capitalize;background:rgba(255,255,255,.2);padding:.1rem .5rem;border-radius:999px;font-size:.75rem;">${u.role}</span></div>
        <div class="profile-stats">
          <div class="profile-stat"><div class="profile-stat-value">${myBids.length}</div><div class="profile-stat-label">Total Bids</div></div>
          <div class="profile-stat"><div class="profile-stat-value">${wonItems}</div><div class="profile-stat-label">Items Won</div></div>
          <div class="profile-stat"><div class="profile-stat-value">${myListings}</div><div class="profile-stat-label">Listings</div></div>
          <div class="profile-stat"><div class="profile-stat-value">${DB.watchlist.length}</div><div class="profile-stat-label">Watchlist</div></div>
        </div>
      </div>
    </div>
  `;
  switchUserTab('my-bids');
}

function switchUserTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.textContent.trim().toLowerCase().replace(/ /g,'-') === tab || b.onclick?.toString().includes(tab)));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const tabs = document.querySelectorAll('.tab-btn');
  const tabMap = { 'my-bids': 0, 'won-items': 1, 'watchlist': 2, 'selling': 3, 'settings': 4 };
  if (tabs[tabMap[tab]]) tabs[tabMap[tab]].classList.add('active');

  const u = state.currentUser;
  const content = document.getElementById('user-tab-content');
  if (!u || !content) return;

  if (tab === 'my-bids') {
    const bids = DB.bids.filter(b => b.bidderId === u.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    content.innerHTML = `<div class="card"><div class="table-container"><table class="data-table">
      <thead><tr><th>Auction</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>${bids.length ? bids.map(b => {
        const a = getAuction(b.auctionId);
        return `<tr><td>${a ? a.title : 'N/A'}</td><td style="font-weight:700;color:var(--primary);">${formatCurrency(b.amount)}</td>
          <td>${timeAgo(b.timestamp)}</td><td>${getBidStatusBadge(b.status)}</td>
          <td>${a ? `<button class="btn btn-outline btn-sm" onclick="viewAuction('${a.id}')"><i class="fas fa-eye"></i> View</button>` : ''}</td></tr>`;
      }).join('') : '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted);">No bids placed yet</td></tr>'}</tbody>
    </table></div></div>`;
  } else if (tab === 'won-items') {
    const won = DB.bids.filter(b => b.bidderId === u.id && b.status === 'Won');
    content.innerHTML = won.length ? `<div class="auctions-grid">${won.map(b => { const a = getAuction(b.auctionId); return a ? renderAuctionCard(a) : ''; }).join('')}</div>`
      : '<div class="empty-state"><i class="fas fa-trophy"></i><h3>No items won yet</h3><p>Start bidding to win amazing items!</p><button class="btn btn-primary" onclick="navigate(\'auctions\')" style="margin-top:1rem;">Browse Auctions</button></div>';
  } else if (tab === 'watchlist') {
    const wl = DB.watchlist.map(id => getAuction(id)).filter(Boolean);
    content.innerHTML = wl.length ? `<div class="auctions-grid">${wl.map(a => renderAuctionCard(a)).join('')}</div>`
      : '<div class="empty-state"><i class="far fa-heart"></i><h3>Watchlist is empty</h3><p>Heart any auction to add it here</p></div>';
  } else if (tab === 'selling') {
    const listings = DB.auctions.filter(a => a.sellerId === u.id);
    content.innerHTML = `<div class="card"><div class="table-container"><table class="data-table">
      <thead><tr><th>Title</th><th>Current Bid</th><th>Bids</th><th>Status</th><th>Ends</th><th>Actions</th></tr></thead>
      <tbody>${listings.length ? listings.map(a => `<tr>
        <td style="font-weight:600;">${a.title}</td>
        <td style="color:var(--primary);font-weight:700;">${formatCurrency(a.currentBid)}</td>
        <td>${getAuctionBids(a.id).length}</td>
        <td>${getStatusBadge(a.status)}</td>
        <td>${formatDate(a.endDate)}</td>
        <td><div class="table-actions">
          <button class="btn btn-outline btn-sm" onclick="viewAuction('${a.id}')"><i class="fas fa-eye"></i></button>
          <button class="btn btn-outline btn-sm" onclick="editAuction('${a.id}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteAuction('${a.id}')"><i class="fas fa-trash"></i></button>
        </div></td>
      </tr>`).join('') : '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted);">No listings yet</td></tr>'}</tbody>
    </table></div></div>`;
  } else if (tab === 'settings') {
    content.innerHTML = `<div class="card settings-form">
      <h3 style="margin-bottom:1.25rem;">Profile Settings</h3>
      <div class="form-row-2">
        <div class="form-group"><label>First Name</label><input type="text" id="set-fname" value="${u.firstName}" /></div>
        <div class="form-group"><label>Last Name</label><input type="text" id="set-lname" value="${u.lastName}" /></div>
      </div>
      <div class="form-group"><label>Email</label><input type="email" id="set-email" value="${u.email}" /></div>
      <div class="form-group"><label>Phone</label><input type="tel" id="set-phone" value="${u.phone || ''}" /></div>
      <div class="form-group"><label>New Password (leave blank to keep current)</label><input type="password" id="set-password" placeholder="New password" /></div>
      <button class="btn btn-primary" onclick="saveSettings()"><i class="fas fa-save"></i> Save Changes</button>
    </div>`;
  }
}

function saveSettings() {
  const u = state.currentUser;
  u.firstName = document.getElementById('set-fname').value.trim();
  u.lastName = document.getElementById('set-lname').value.trim();
  u.name = `${u.firstName} ${u.lastName}`;
  u.email = document.getElementById('set-email').value.trim();
  u.phone = document.getElementById('set-phone').value.trim();
  const pw = document.getElementById('set-password').value;
  if (pw) u.password = pw;
  saveToStorage();
  updateUserUI();
  showToast('Settings saved! ✅', 'success');
}

// ================================================================
// REPORTS
// ================================================================
function renderReports() {
  const auctions = DB.auctions;
  const sold = auctions.filter(a => a.status === 'Sold');
  const revenue = sold.reduce((s, a) => s + a.currentBid, 0);
  const avgBid = DB.bids.length ? DB.bids.reduce((s, b) => s + b.amount, 0) / DB.bids.length : 0;

  document.getElementById('report-stats').innerHTML = `
    <div class="stat-card"><div class="stat-icon purple"><i class="fas fa-chart-line"></i></div><div><div class="stat-value">${auctions.length}</div><div class="stat-label">Total Auctions</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fas fa-check-circle"></i></div><div><div class="stat-value">${sold.length}</div><div class="stat-label">Items Sold</div></div></div>
    <div class="stat-card"><div class="stat-icon yellow"><i class="fas fa-rupee-sign"></i></div><div><div class="stat-value">${formatCurrency(revenue)}</div><div class="stat-label">Total Revenue</div></div></div>
    <div class="stat-card"><div class="stat-icon blue"><i class="fas fa-balance-scale"></i></div><div><div class="stat-value">${formatCurrency(avgBid)}</div><div class="stat-label">Avg Bid Value</div></div></div>
  `;

  // Revenue chart
  const months = [];
  const revData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push(d.toLocaleDateString('en-IN', { month: 'short' }));
    revData.push(auctions.filter(a => a.status === 'Sold' && new Date(a.endDate).getMonth() === d.getMonth()).reduce((s, a) => s + a.currentBid, 0));
  }
  if (state.charts.revenue) state.charts.revenue.destroy();
  const revCtx = document.getElementById('revenueChart');
  if (revCtx) {
    state.charts.revenue = new Chart(revCtx, {
      type: 'bar',
      data: { labels: months, datasets: [{ label: 'Revenue (₹)', data: revData, backgroundColor: 'rgba(124,58,237,.7)', borderRadius: 6 }] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
  }

  // Bids per auction
  const top = [...auctions].sort((a, b) => getAuctionBids(b.id).length - getAuctionBids(a.id).length).slice(0, 6);
  if (state.charts.bids) state.charts.bids.destroy();
  const bidsCtx = document.getElementById('bidsChart');
  if (bidsCtx) {
    state.charts.bids = new Chart(bidsCtx, {
      type: 'horizontalBar',
      type: 'bar',
      data: { labels: top.map(a => a.title.substring(0,20)+'...'), datasets: [{ label: 'Bids', data: top.map(a => getAuctionBids(a.id).length), backgroundColor: 'rgba(16,185,129,.7)', borderRadius: 6 }] },
      options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } }
    });
  }

  // Table
  const filter = document.getElementById('report-filter')?.value || 'all';
  const filtered = filter === 'all' ? auctions : auctions.filter(a => a.status === filter);
  document.getElementById('reports-table-body').innerHTML = filtered.map(a => `
    <tr>
      <td style="font-weight:600;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a.title}</td>
      <td>${getCategoryName(a.category)}</td>
      <td>${formatCurrency(a.startingPrice)}</td>
      <td style="color:var(--primary);font-weight:700;">${formatCurrency(a.currentBid)}</td>
      <td>${getAuctionBids(a.id).length}</td>
      <td>${getStatusBadge(a.status)}</td>
      <td>${formatDate(a.endDate)}</td>
    </tr>
  `).join('') || '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-muted);">No data</td></tr>';
}

function exportReport(format) {
  if (format === 'csv') {
    const rows = [['Title','Category','Starting Price','Final Bid','Total Bids','Status','End Date']];
    DB.auctions.forEach(a => rows.push([a.title, getCategoryName(a.category), a.startingPrice, a.currentBid, getAuctionBids(a.id).length, a.status, formatDate(a.endDate)]));
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'AuctionHub_Report.csv'; link.click();
    showToast('CSV exported!', 'success');
  } else {
    showToast('PDF export coming soon!', 'info');
  }
}

// ================================================================
// WINNING & SETTLEMENT
// ================================================================
function renderWinningSettlement() {
  const closed = DB.auctions.filter(a => (a.status === 'Closed' || a.status === 'Sold') && getAuctionBids(a.id).length > 0);
  const declared = closed.filter(a => a.winnerId);
  const pending = closed.filter(a => !a.winnerId && a.status === 'Closed');

  document.getElementById('winner-stats').innerHTML = `
    <div class="stat-card"><div class="stat-icon purple"><i class="fas fa-trophy"></i></div><div><div class="stat-value">${declared.length}</div><div class="stat-label">Winners Declared</div></div></div>
    <div class="stat-card"><div class="stat-icon yellow"><i class="fas fa-clock"></i></div><div><div class="stat-value">${pending.length}</div><div class="stat-label">Pending Declaration</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fas fa-handshake"></i></div><div><div class="stat-value">${DB.settlements.length}</div><div class="stat-label">Settlements Done</div></div></div>
  `;

  document.getElementById('pending-winners').innerHTML = pending.length ? pending.map(a => {
    const topBid = getAuctionBids(a.id)[0];
    const winner = topBid ? getUser(topBid.bidderId) : null;
    return `<div class="pending-winner-item">
      <div class="pending-winner-info"><h4>${a.title}</h4><p>Top bid: ${topBid ? formatCurrency(topBid.amount) : 'N/A'} by ${winner ? winner.name : 'N/A'} &nbsp;•&nbsp; Ended: ${formatDate(a.endDate)}</p></div>
      <button class="btn btn-primary btn-sm" onclick="declareWinner('${a.id}')"><i class="fas fa-trophy"></i> Declare Winner</button>
    </div>`;
  }).join('') : '<div style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:.85rem;">No pending declarations</div>';

  document.getElementById('winners-table-body').innerHTML = declared.length ? declared.map(a => {
    const winner = getUser(a.winnerId);
    const topBid = getAuctionBids(a.id)[0];
    const settlement = DB.settlements.find(s => s.auctionId === a.id);
    return `<tr>
      <td style="font-weight:600;">${a.title}</td>
      <td><div class="table-user"><div class="table-avatar">${winner ? winner.firstName[0] : '?'}</div><span>${winner ? winner.name : 'N/A'}</span></div></td>
      <td style="color:var(--primary);font-weight:700;">${topBid ? formatCurrency(topBid.amount) : 'N/A'}</td>
      <td>${settlement ? `<span class="bid-status bid-status-winning">${settlement.status}</span>` : `<span class="bid-status bid-status-placed">Pending</span>`}</td>
      <td><div class="table-actions">
        ${!settlement ? `<button class="btn btn-success btn-sm" onclick="updateSettlement('${a.id}','Payment Received')"><i class="fas fa-check"></i> Mark Paid</button>` : ''}
        <button class="btn btn-outline btn-sm" onclick="viewAuction('${a.id}')"><i class="fas fa-eye"></i></button>
      </div></td>
    </tr>`;
  }).join('') : '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted);">No winners declared yet</td></tr>';
}

function declareWinner(auctionId) {
  const a = getAuction(auctionId);
  if (!a) return;
  const topBid = getAuctionBids(auctionId)[0];
  if (!topBid) { showToast('No bids on this auction', 'warning'); return; }
  const winner = getUser(topBid.bidder_id || topBid.bidderId);
  confirmAction('Declare Winner', `Declare ${winner ? (winner.username || winner.name) : 'bidder'} as winner with bid of ${formatCurrency(topBid.amount)}?`, () => {
    a.winnerId = topBid.bidder_id || topBid.bidderId;
    a.status = 'sold';
    topBid.status = 'won';
    bids.filter(b => String(b.auction_id || b.auctionId) === String(auctionId) && String(b.id) !== String(topBid.id))
        .forEach(b => { if (String(b.status).toLowerCase() !== 'won') b.status = 'lost'; });
    state.notifications.unshift({ id: Date.now(), text: `Winner declared for "${a.title}"! Congratulations ${winner ? (winner.username || winner.name) : 'bidder'}!`, time: 'just now', read: false, icon: 'fas fa-trophy' });
    saveToStorage();
    renderWinningSettlement();
    showToast(`Winner declared: ${winner ? (winner.username || winner.name) : 'Unknown'}! 🏆`, 'success');
  });
}

function updateSettlement(auctionId, status) {
  const existing = DB.settlements.find(s => s.auctionId === auctionId);
  if (existing) existing.status = status;
  else DB.settlements.push({ auctionId, status, date: new Date().toISOString() });
  saveToStorage();
  renderWinningSettlement();
  showToast('Settlement updated!', 'success');
}

// ================================================================
// CONFIRM MODAL
// ================================================================
function closeConfirmModal(e) { if (e.target === e.currentTarget) closeConfirmModalBtn(); }
function closeConfirmModalBtn() { document.getElementById('confirm-modal').classList.add('hidden'); state.confirmCallback = null; }
function executeConfirmAction() {
  closeConfirmModalBtn();
  if (state.confirmCallback) { state.confirmCallback(); state.confirmCallback = null; }
}

// ================================================================
// INIT
// ================================================================
function init() {
  // Load dark mode preference
  const dark = localStorage.getItem('auctionhub_dark') === 'true';
  if (dark) { state.darkMode = true; document.documentElement.setAttribute('data-theme', 'dark'); document.getElementById('dark-mode-icon').className = 'fas fa-sun'; }

  // Set default datetime values for create auction
  const now = new Date();
  const future = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const fmtLocal = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  const sdEl = document.getElementById('auction-start-date');
  const edEl = document.getElementById('auction-end-date');
  if (sdEl) sdEl.value = fmtLocal(now);
  if (edEl) edEl.value = fmtLocal(future);

  loadFromStorage();
  updateCategoryCounts();

  // Support direct hash navigation on load
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && state.currentUser) {
    navigate(initialHash);
  }
}

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && hash !== state.currentPage && state.currentUser) {
    navigate(hash);
  }
});

window.addEventListener('DOMContentLoaded', init);
