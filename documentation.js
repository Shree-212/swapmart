// Documentation Page JavaScript
// Handles navigation, lazy loading, and interactivity

// ===== NAVIGATION HIGHLIGHTING =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('.doc-nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Throttled scroll handler for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveNavLink();
    });
});

// ===== LAZY LOADING SECTIONS =====
let currentLoadedSection = 2; // Already loaded: platform, categories
const totalSections = 6; // Total sections to load

// Make function globally accessible
window.loadNextSection = function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const docContent = document.querySelector('.doc-content');
    
    if (!loadMoreBtn || !docContent) {
        return;
    }
    
    if (currentLoadedSection >= totalSections) {
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    // Show loading state
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerHTML = '<span class="loader-spinner" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin-right: 8px; border: 3px solid var(--light-gray); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite;"></span> Loading...';
    
    // Simulate loading
    setTimeout(() => {
        const loadMoreSection = document.querySelector('.load-more-section');
        
        // Load next section based on current position
        switch(currentLoadedSection) {
            case 2:
                loadUserAppSection(loadMoreSection);
                break;
            case 3:
                loadAdminPanelSection(loadMoreSection);
                break;
            case 4:
                loadUserJourneysSection(loadMoreSection);
                break;
            case 5:
                loadTechnicalArchitectureSection(loadMoreSection);
                break;
        }
        
        currentLoadedSection++;
        
        // Update button
        if (currentLoadedSection >= totalSections) {
            loadMoreBtn.textContent = 'All Sections Loaded ✓';
            loadMoreBtn.disabled = true;
            setTimeout(() => {
                loadMoreBtn.style.display = 'none';
            }, 1500);
        } else {
            loadMoreBtn.disabled = false;
            loadMoreBtn.innerHTML = 'Load More Sections →';
        }
    }, 800);
};

// ===== SECTION LOADERS =====

function loadUserAppSection(insertBefore) {
    const section = document.createElement('section');
    section.id = 'user-app';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">03</span>
            User Application Features
        </h2>
        
        <div class="content-block">
            <h3>1. User Authentication & Onboarding</h3>
            <h4>Registration Options</h4>
            <ul>
                <li>Phone number verification via OTP</li>
                <li>Email registration with verification</li>
                <li>Social login (Google, Facebook, Apple)</li>
                <li>Profile creation with user type selection (Buyer/Seller/Both)</li>
            </ul>
            <h4>Profile Management</h4>
            <ul>
                <li>Personal information and profile picture upload</li>
                <li>Identity verification with government ID</li>
                <li>Multiple address management</li>
                <li>Saved payment methods</li>
                <li>Notification preferences customization</li>
            </ul>
        </div>

        <div class="content-block">
            <h3>2. Product Discovery</h3>
            <h4>Search & Browse</h4>
            <ul>
                <li>Category-based navigation tree</li>
                <li>Keyword search with autocomplete</li>
                <li>Advanced filters (price range, location, condition, brand)</li>
                <li>Sort options (newest, price low-high, distance, popularity)</li>
                <li>Saved searches with email/push alerts</li>
            </ul>
            <h4>Product Listings Display</h4>
            <ul>
                <li>High-quality product images (3-10 per listing)</li>
                <li>Detailed specifications and descriptions</li>
                <li>Condition assessment and grading badges</li>
                <li>Seller information, ratings, and reviews</li>
                <li>Price history and trend charts</li>
                <li>Similar product recommendations</li>
            </ul>
        </div>

        <div class="content-block">
            <h3>3. Buying Features</h3>
            <h4>Purchase Flow</h4>
            <ul>
                <li>Watchlist/Favorites with price drop alerts</li>
                <li>Direct purchase for fixed-price listings</li>
                <li>Make-an-offer system with counter-offer support</li>
                <li>Bidding system for auction listings</li>
                <li>In-app messaging with sellers</li>
                <li>Video call scheduling for product inspection</li>
            </ul>
            <h4>Transaction Management</h4>
            <ul>
                <li>Secure payment processing with multiple gateways</li>
                <li>Real-time order tracking with notifications</li>
                <li>Delivery scheduling with calendar integration</li>
                <li>Inspection upon delivery checklist</li>
                <li>Return and refund request system</li>
                <li>Complete transaction history with invoices</li>
            </ul>
        </div>

        <div class="content-block">
            <h3>4. Selling Features</h3>
            <h4>Listing Creation</h4>
            <ul>
                <li>Step-by-step listing wizard with validation</li>
                <li>Category-specific input fields and templates</li>
                <li>Multiple image upload with editing tools (crop, rotate)</li>
                <li>AI-powered price suggestion based on similar products</li>
                <li>Condition self-assessment questionnaire</li>
                <li>Listing duration selection (7/15/30 days)</li>
            </ul>
            <h4>Seller Dashboard</h4>
            <ul>
                <li>Active listings overview with quick actions</li>
                <li>Performance metrics (views, inquiries, favorites)</li>
                <li>Offer and bid management interface</li>
                <li>Message center with notification badges</li>
                <li>Sales history with analytics</li>
                <li>Earnings summary and payout tracking</li>
            </ul>
        </div>

        <div class="feature-boxes">
            <div class="feature-box">
                <div class="feature-box-icon">💬</div>
                <h4>Communication Tools</h4>
                <ul>
                    <li>Real-time chat with typing indicators</li>
                    <li>Media sharing (photos, documents)</li>
                    <li>Offer submission through chat</li>
                    <li>Video call integration (Twilio/Agora)</li>
                    <li>Message templates for quick responses</li>
                    <li>Report and block options</li>
                </ul>
            </div>
            <div class="feature-box">
                <div class="feature-box-icon">🔔</div>
                <h4>Notifications & Alerts</h4>
                <ul>
                    <li>New message push notifications</li>
                    <li>Price drop alerts on watchlist</li>
                    <li>Bid updates for auction items</li>
                    <li>Transaction status updates</li>
                    <li>Saved search match notifications</li>
                    <li>Platform announcements</li>
                </ul>
            </div>
            <div class="feature-box">
                <div class="feature-box-icon">💳</div>
                <h4>Payment Methods</h4>
                <ul>
                    <li>Credit/Debit cards (Visa, Mastercard, RuPay)</li>
                    <li>UPI (Google Pay, PhonePe, Paytm)</li>
                    <li>Digital wallets (Paytm, Amazon Pay)</li>
                    <li>Net banking (all major banks)</li>
                    <li>EMI options (3/6/9/12 months)</li>
                    <li>Cash on delivery (select categories)</li>
                </ul>
            </div>
        </div>
    `;
    
    insertBefore.parentNode.insertBefore(section, insertBefore);
}

function loadAdminPanelSection(insertBefore) {
    const section = document.createElement('section');
    section.id = 'admin-panel';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">04</span>
            Admin Panel & Roles
        </h2>

        <div class="info-callout info-callout-accent">
            <h4>Hierarchical Access Control</h4>
            <p>The SwapMart admin panel features a comprehensive role-based access control system with five distinct management tiers, each with specific responsibilities and permissions.</p>
        </div>

        <div class="role-grid">
            <div class="role-card">
                <div class="role-icon">👔</div>
                <h4>Chief Operations Officer (COO)</h4>
                <p class="role-desc">Super Administrator with complete platform control and strategic decision-making authority.</p>
                <ul>
                    <li>Global settings and configuration management</li>
                    <li>Financial oversight and revenue analytics</li>
                    <li>Strategic decision-making dashboard</li>
                    <li>Emergency access to all systems</li>
                    <li>User and admin role management</li>
                    <li>Platform-wide policy enforcement</li>
                </ul>
            </div>

            <div class="role-card">
                <div class="role-icon">📦</div>
                <h4>Category Manager</h4>
                <p class="role-desc">Manages specific product categories including inventory, pricing, and seller relationships.</p>
                <ul>
                    <li>Category-specific operations control</li>
                    <li>Seller relationship management</li>
                    <li>Inventory oversight (electronics buyback)</li>
                    <li>Pricing strategy and competitive analysis</li>
                    <li>Quality standards enforcement</li>
                    <li>Category performance analytics</li>
                </ul>
            </div>

            <div class="role-card">
                <div class="role-icon">🎯</div>
                <h4>UX Manager</h4>
                <p class="role-desc">Oversees customer support, community moderation, and user experience improvements.</p>
                <ul>
                    <li>Customer support team management</li>
                    <li>Community moderation and safety</li>
                    <li>User feedback analysis and reporting</li>
                    <li>Interface improvement recommendations</li>
                    <li>Dispute resolution oversight</li>
                    <li>Crisis management protocols</li>
                </ul>
            </div>

            <div class="role-card">
                <div class="role-icon">✅</div>
                <h4>QC Manager</h4>
                <p class="role-desc">Manages quality control team, inspection standards, and certification processes.</p>
                <ul>
                    <li>QC team and inspector management</li>
                    <li>Quality standards maintenance</li>
                    <li>Inspection workflow optimization</li>
                    <li>Device grading guidelines</li>
                    <li>QC performance analytics</li>
                    <li>Certification system oversight</li>
                </ul>
            </div>

            <div class="role-card">
                <div class="role-icon">📊</div>
                <h4>Analytics Manager</h4>
                <p class="role-desc">Handles data analysis, reporting, business intelligence, and performance metrics.</p>
                <ul>
                    <li>Business intelligence dashboards</li>
                    <li>Custom report generation</li>
                    <li>User behavior analysis</li>
                    <li>Revenue and transaction analytics</li>
                    <li>Market trend identification</li>
                    <li>KPI monitoring and forecasting</li>
                </ul>
            </div>
        </div>

        <div class="content-block">
            <h3>Core Admin Features</h3>
            <h4>User Management</h4>
            <ul>
                <li>User search and filtering (status, type, verification)</li>
                <li>Profile view with complete activity history</li>
                <li>Account suspension and ban controls</li>
                <li>Identity verification approval</li>
                <li>User segmentation and tagging</li>
                <li>Bulk operations support</li>
            </ul>

            <h4>Listing Moderation</h4>
            <ul>
                <li>Pending listings review queue</li>
                <li>Auto-flagged content review</li>
                <li>Manual reporting investigation</li>
                <li>Bulk approval/rejection tools</li>
                <li>Category reassignment</li>
                <li>Listing quality scoring</li>
            </ul>

            <h4>Transaction Oversight</h4>
            <ul>
                <li>Real-time transaction monitoring</li>
                <li>Payment status tracking</li>
                <li>Refund processing interface</li>
                <li>Dispute resolution workflow</li>
                <li>Transaction analytics dashboard</li>
                <li>Fraud detection alerts</li>
            </ul>

            <h4>Financial Management</h4>
            <ul>
                <li>Revenue tracking by category</li>
                <li>Commission calculation and reports</li>
                <li>Seller payout management</li>
                <li>Refund processing</li>
                <li>Financial reports (daily/weekly/monthly)</li>
                <li>Tax document generation</li>
            </ul>
        </div>
    `;
    
    insertBefore.parentNode.insertBefore(section, insertBefore);
}

function loadUserJourneysSection(insertBefore) {
    const section = document.createElement('section');
    section.id = 'user-journeys';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">05</span>
            User Journeys
        </h2>

        <div class="section-intro">
            <p class="lead-text">Detailed step-by-step user journeys demonstrating how different user personas interact with the SwapMart platform across various product categories.</p>
        </div>

        <div class="journey-grid">
            <!-- Journey 1: Selling Electronics -->
            <div class="journey-card">
                <div class="journey-header">
                    <div class="journey-icon">📱</div>
                    <div class="journey-title">
                        <h3>Selling Electronics</h3>
                        <div class="journey-meta">
                            <span>⏱️ 15-20 minutes</span>
                            <span>📋 Direct Buyback</span>
                        </div>
                    </div>
                </div>
                <ol class="journey-steps">
                    <li class="journey-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Registration & Login</h4>
                            <p>User downloads app and registers using phone number with OTP verification</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Device Selection</h4>
                            <p>Selects "Sell Electronics" → Choose device type → Enter model number or IMEI</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Instant Quote</h4>
                            <p>System displays instant price quote based on device model and market rates</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Condition Assessment</h4>
                            <p>Answers condition questions (screen, battery, functional issues)</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h4>QC Scheduling</h4>
                            <p>Books QC inspection slot with preferred date and time</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">6</div>
                        <div class="step-content">
                            <h4>Inspector Visit</h4>
                            <p>Inspector arrives, performs 30+ point check, grades device</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">7</div>
                        <div class="step-content">
                            <h4>Price Finalization</h4>
                            <p>Final price confirmed based on QC report, user accepts/declines</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">8</div>
                        <div class="step-content">
                            <h4>Instant Payment</h4>
                            <p>Payment transferred to user's account immediately upon acceptance</p>
                        </div>
                    </li>
                </ol>
            </div>

            <!-- Journey 2: Buying a Car -->
            <div class="journey-card">
                <div class="journey-header">
                    <div class="journey-icon">🚗</div>
                    <div class="journey-title">
                        <h3>Buying an Automobile</h3>
                        <div class="journey-meta">
                            <span>⏱️ 30-45 minutes</span>
                            <span>📋 Peer-to-Peer</span>
                        </div>
                    </div>
                </div>
                <ol class="journey-steps">
                    <li class="journey-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Search & Filter</h4>
                            <p>Browses automobiles category with filters (brand, price, year, location)</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Listing Review</h4>
                            <p>Views detailed listing with photos, specs, service history</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Seller Communication</h4>
                            <p>Initiates chat with seller, asks questions about vehicle condition</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Test Drive Schedule</h4>
                            <p>Books test drive appointment through calendar integration</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h4>Physical Inspection</h4>
                            <p>Meets seller, test drives vehicle, inspects documents</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">6</div>
                        <div class="step-content">
                            <h4>Negotiation</h4>
                            <p>Makes offer through app, negotiates price with seller</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">7</div>
                        <div class="step-content">
                            <h4>Payment</h4>
                            <p>Completes secure payment through platform (escrow protected)</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">8</div>
                        <div class="step-content">
                            <h4>RC Transfer</h4>
                            <p>Accesses RC transfer documentation support and completes ownership change</p>
                        </div>
                    </li>
                </ol>
            </div>

            <!-- Journey 3: Selling Furniture -->
            <div class="journey-card">
                <div class="journey-header">
                    <div class="journey-icon">🪑</div>
                    <div class="journey-title">
                        <h3>Selling Furniture</h3>
                        <div class="journey-meta">
                            <span>⏱️ 20-30 minutes</span>
                            <span>📋 Peer-to-Peer</span>
                        </div>
                    </div>
                </div>
                <ol class="journey-steps">
                    <li class="journey-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Create Listing</h4>
                            <p>Selects "Sell Furniture" → Chooses item type (sofa, bed, table)</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Add Details</h4>
                            <p>Fills in dimensions, material, brand, purchase date, condition</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Upload Photos</h4>
                            <p>Takes and uploads 5-8 photos showing all angles and details</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Price Setting</h4>
                            <p>Reviews AI price suggestion, sets final asking price</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h4>Delivery Options</h4>
                            <p>Specifies pickup/delivery preferences and availability</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">6</div>
                        <div class="step-content">
                            <h4>Listing Published</h4>
                            <p>Listing goes live after quick automated review (2-4 hours)</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">7</div>
                        <div class="step-content">
                            <h4>Buyer Interaction</h4>
                            <p>Receives inquiries, responds to messages, negotiates offers</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">8</div>
                        <div class="step-content">
                            <h4>Transaction Complete</h4>
                            <p>Confirms sale, coordinates pickup/delivery, receives payment</p>
                        </div>
                    </li>
                </ol>
            </div>

            <!-- Journey 4: Buying a Laptop -->
            <div class="journey-card">
                <div class="journey-header">
                    <div class="journey-icon">💻</div>
                    <div class="journey-title">
                        <h3>Buying Refurbished Laptop</h3>
                        <div class="journey-meta">
                            <span>⏱️ 25-35 minutes</span>
                            <span>📋 Platform Inventory</span>
                        </div>
                    </div>
                </div>
                <ol class="journey-steps">
                    <li class="journey-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Browse Inventory</h4>
                            <p>Explores certified refurbished laptops with QC reports</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>View QC Report</h4>
                            <p>Reviews detailed 30+ point quality check report with photos</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Specification Check</h4>
                            <p>Verifies specifications (processor, RAM, storage, condition grade)</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Warranty Review</h4>
                            <p>Checks warranty terms (6-12 months platform warranty)</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h4>Add to Cart</h4>
                            <p>Adds laptop to cart, reviews pricing and delivery options</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">6</div>
                        <div class="step-content">
                            <h4>Payment Selection</h4>
                            <p>Chooses payment method (card/UPI/EMI), applies any discount codes</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">7</div>
                        <div class="step-content">
                            <h4>Order Tracking</h4>
                            <p>Tracks shipment with real-time updates and estimated delivery</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">8</div>
                        <div class="step-content">
                            <h4>Delivery & Inspection</h4>
                            <p>Receives laptop, inspects on delivery, confirms or raises issues</p>
                        </div>
                    </li>
                </ol>
            </div>

            <!-- Journey 5: Buying Property -->
            <div class="journey-card">
                <div class="journey-header">
                    <div class="journey-icon">🏠</div>
                    <div class="journey-title">
                        <h3>Buying Real Estate</h3>
                        <div class="journey-meta">
                            <span>⏱️ 45-60 minutes</span>
                            <span>📋 Peer-to-Peer</span>
                        </div>
                    </div>
                </div>
                <ol class="journey-steps">
                    <li class="journey-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Property Search</h4>
                            <p>Searches by location, property type, budget, amenities</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Virtual Tour</h4>
                            <p>Views 360° photos/videos and detailed floor plans</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Document Review</h4>
                            <p>Reviews uploaded legal documents (title deed, NOC, etc.)</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Seller Contact</h4>
                            <p>Contacts seller through video call for detailed discussion</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h4>Site Visit</h4>
                            <p>Schedules and completes physical property inspection</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">6</div>
                        <div class="step-content">
                            <h4>Price Negotiation</h4>
                            <p>Negotiates price through platform messaging system</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">7</div>
                        <div class="step-content">
                            <h4>Legal Verification</h4>
                            <p>Engages legal services (via platform partners) for document verification</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">8</div>
                        <div class="step-content">
                            <h4>Transaction Completion</h4>
                            <p>Completes payment and ownership transfer with platform documentation support</p>
                        </div>
                    </li>
                </ol>
            </div>

            <!-- Journey 6: Selling Motorcycle -->
            <div class="journey-card">
                <div class="journey-header">
                    <div class="journey-icon">🏍️</div>
                    <div class="journey-title">
                        <h3>Selling Motorcycle</h3>
                        <div class="journey-meta">
                            <span>⏱️ 25-35 minutes</span>
                            <span>📋 Peer-to-Peer</span>
                        </div>
                    </div>
                </div>
                <ol class="journey-steps">
                    <li class="journey-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>RC Number Entry</h4>
                            <p>Enters vehicle registration number for auto-filled details</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Vehicle Details</h4>
                            <p>System populates make, model, year; seller adds mileage, ownership</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Condition Report</h4>
                            <p>Fills condition checklist (engine, tires, brakes, body damage)</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Photo Upload</h4>
                            <p>Uploads 6-10 photos including RC, insurance, service records</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h4>Price Setting</h4>
                            <p>Reviews market comparison, sets asking price (fixed or negotiable)</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">6</div>
                        <div class="step-content">
                            <h4>Listing Approval</h4>
                            <p>Listing reviewed and approved within 4-6 hours</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">7</div>
                        <div class="step-content">
                            <h4>Buyer Engagement</h4>
                            <p>Receives inquiries, schedules test rides, negotiates offers</p>
                        </div>
                    </li>
                    <li class="journey-step">
                        <div class="step-number">8</div>
                        <div class="step-content">
                            <h4>Sale & Transfer</h4>
                            <p>Accepts offer, completes transaction, uses RC transfer support</p>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    `;
    
    insertBefore.parentNode.insertBefore(section, insertBefore);
}

function loadTechnicalArchitectureSection(insertBefore) {
    const section = document.createElement('section');
    section.id = 'technical-architecture';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">06</span>
            Technical Architecture
        </h2>

        <div class="content-block">
            <h3>Technology Stack</h3>
            <h4>Frontend Technologies</h4>
            <ul>
                <li><strong>iOS:</strong> Swift/SwiftUI for native performance and modern UI patterns</li>
                <li><strong>Android:</strong> Kotlin with Jetpack Compose for reactive UI development</li>
                <li><strong>Web:</strong> React.js with Next.js for SSR/SSG capabilities and SEO optimization</li>
                <li><strong>State Management:</strong> Redux for web, Combine for iOS, StateFlow for Android</li>
                <li><strong>UI Components:</strong> Material-UI (web), Native components (mobile)</li>
            </ul>

            <h4>Backend Architecture</h4>
            <ul>
                <li><strong>Application Layer:</strong> Node.js with Express.js for RESTful APIs</li>
                <li><strong>Microservices:</strong> Separate services for user, listing, transaction, payment, QC</li>
                <li><strong>API Gateway:</strong> Kong or AWS API Gateway for routing and rate limiting</li>
                <li><strong>GraphQL:</strong> Apollo Server for flexible data queries (optional for complex scenarios)</li>
                <li><strong>Real-time:</strong> WebSockets (Socket.io) for chat and notifications</li>
            </ul>

            <h4>Database Systems</h4>
            <ul>
                <li><strong>Primary Database:</strong> PostgreSQL for transactional data (users, listings, transactions)</li>
                <li><strong>Document Store:</strong> MongoDB for flexible schemas (product specs, user preferences)</li>
                <li><strong>Caching:</strong> Redis for session management, API caching, and rate limiting</li>
                <li><strong>Search:</strong> Elasticsearch for full-text search and faceted filtering</li>
                <li><strong>File Storage:</strong> AWS S3 or Azure Blob Storage for images and documents</li>
            </ul>

            <h4>Infrastructure</h4>
            <ul>
                <li><strong>Cloud Provider:</strong> AWS or Azure for scalable infrastructure</li>
                <li><strong>Containerization:</strong> Docker for consistent deployment environments</li>
                <li><strong>Orchestration:</strong> Kubernetes for container management and auto-scaling</li>
                <li><strong>Load Balancing:</strong> AWS ELB or Nginx for traffic distribution</li>
                <li><strong>CDN:</strong> CloudFront or Azure CDN for global content delivery</li>
                <li><strong>Monitoring:</strong> Datadog or New Relic for application performance monitoring</li>
            </ul>
        </div>

        <div class="content-block">
            <h3>Integration Services</h3>
            <h4>Payment Gateways</h4>
            <ul>
                <li><strong>Primary:</strong> Razorpay for comprehensive payment solutions</li>
                <li><strong>Secondary:</strong> PayU, Stripe for redundancy and international transactions</li>
                <li><strong>UPI:</strong> Direct UPI integration for instant transfers</li>
                <li><strong>EMI Partners:</strong> Bajaj Finserv, HDFC Bank for financing options</li>
            </ul>

            <h4>Communication Services</h4>
            <ul>
                <li><strong>Video Calling:</strong> Twilio or Agora for in-app video consultations</li>
                <li><strong>SMS Gateway:</strong> Twilio or MSG91 for OTP and notifications</li>
                <li><strong>Email Service:</strong> SendGrid or AWS SES for transactional emails</li>
                <li><strong>Push Notifications:</strong> Firebase Cloud Messaging (FCM) for mobile, OneSignal for web</li>
            </ul>

            <h4>Logistics & Maps</h4>
            <ul>
                <li><strong>Delivery Partners:</strong> Delhivery, Blue Dart, DHL APIs for shipping</li>
                <li><strong>Maps Integration:</strong> Google Maps API for location services</li>
                <li><strong>Geocoding:</strong> Mapbox or Google Geocoding for address validation</li>
            </ul>
        </div>

        <div class="content-block">
            <h3>Security & Compliance</h3>
            <ul>
                <li><strong>Authentication:</strong> JWT tokens with refresh mechanism</li>
                <li><strong>Multi-Factor Auth:</strong> TOTP-based 2FA for admin and high-value transactions</li>
                <li><strong>Data Encryption:</strong> AES-256 for data at rest, TLS 1.3 for data in transit</li>
                <li><strong>Payment Security:</strong> PCI DSS Level 1 compliance</li>
                <li><strong>API Security:</strong> OAuth 2.0, rate limiting, API key management</li>
                <li><strong>GDPR Compliance:</strong> Data privacy controls, right to deletion, consent management</li>
                <li><strong>Regular Audits:</strong> Quarterly security assessments and penetration testing</li>
            </ul>
        </div>

        <div class="info-callout">
            <h4>Scalability Considerations</h4>
            <p>The architecture is designed for horizontal scaling with the following capabilities:</p>
            <ul>
                <li>Auto-scaling groups for dynamic resource allocation</li>
                <li>Database read replicas for improved query performance</li>
                <li>CDN caching for static assets and media files</li>
                <li>Message queues (RabbitMQ/SQS) for asynchronous processing</li>
                <li>Microservices architecture for independent service scaling</li>
                <li>Multi-region deployment for global availability</li>
            </ul>
        </div>
    `;
    
    insertBefore.parentNode.insertBefore(section, insertBefore);
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    const loader = document.getElementById('content-loader');
    if (loader) {
        loader.classList.remove('active');
    }
    
    // Initialize navigation highlighting
    updateActiveNavLink();
    
    console.log('SwapMart Documentation loaded successfully');
});
