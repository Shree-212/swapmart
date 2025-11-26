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
const totalSections = 8; // Total sections to load (increased from 6)

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
            case 6:
                loadExecutionPlanSection(loadMoreSection);
                break;
            case 7:
                loadVariantComparisonSection(loadMoreSection);
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
        
        <div class=\"feature-card-doc\">
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

function loadExecutionPlanSection(insertBefore) {
    const section = document.createElement('section');
    section.id = 'execution-plan';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">07</span>
            Execution Plan Overview
        </h2>

        <div class="section-intro">
            <p class="lead-text">SwapMart offers six carefully designed implementation variants, each tailored to different business requirements, budgets, and timelines. From a web-only MVP to an enterprise-scale global ecosystem, choose the path that aligns with your strategic goals.</p>
        </div>

        <div class="architecture-variants">
            <div class="variant-detail">
                <div class="variant-detail-header">
                    <span class="variant-detail-number">1</span>
                    <h3>Web-Only MVP</h3>
                </div>
                <p class="variant-detail-desc">Minimal viable product focused on electronics buyback through web platform, establishing core marketplace functionality and validating business model.</p>
                <div class="variant-detail-metrics">
                    <div class="metric">
                        <span class="metric-label">Timeline</span>
                        <span class="metric-value">8 weeks</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Budget</span>
                        <span class="metric-value">₹2.5-4L</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Team Size</span>
                        <span class="metric-value">3-4</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Scalability</span>
                        <span class="metric-value">1K users</span>
                    </div>
                </div>
                <div class="variant-detail-content">
                    <div class="variant-tech">
                        <h4>Tech Stack</h4>
                        <div class="tech-tags">
                            <span class="tech-tag-doc">React.js</span>
                            <span class="tech-tag-doc">Node.js</span>
                            <span class="tech-tag-doc">MongoDB</span>
                            <span class="tech-tag-doc">Material-UI</span>
                        </div>
                    </div>
                    <div class="variant-features">
                        <h4>Key Features</h4>
                        <ul>
                            <li>Electronics-only marketplace</li>
                            <li>Basic user authentication</li>
                            <li>Simple listing creation</li>
                            <li>Direct messaging</li>
                            <li>Single admin dashboard</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="variant-detail">
                <div class="variant-detail-header">
                    <span class="variant-detail-number">2</span>
                    <h3>Enhanced Web Platform</h3>
                </div>
                <p class="variant-detail-desc">Comprehensive web platform supporting all product categories with peer-to-peer functionality, enhanced admin capabilities, and PWA support.</p>
                <div class="variant-detail-metrics">
                    <div class="metric">
                        <span class="metric-label">Timeline</span>
                        <span class="metric-value">14 weeks</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Budget</span>
                        <span class="metric-value">₹5-7.5L</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Team Size</span>
                        <span class="metric-value">4-6</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Scalability</span>
                        <span class="metric-value">10K users</span>
                    </div>
                </div>
                <div class="variant-detail-content">
                    <div class="variant-tech">
                        <h4>Tech Stack</h4>
                        <div class="tech-tags">
                            <span class="tech-tag-doc">Next.js</span>
                            <span class="tech-tag-doc">PostgreSQL</span>
                            <span class="tech-tag-doc">Redis</span>
                            <span class="tech-tag-doc">AWS S3</span>
                            <span class="tech-tag-doc">Socket.io</span>
                        </div>
                    </div>
                    <div class="variant-features">
                        <h4>Key Features</h4>
                        <ul>
                            <li>All product categories</li>
                            <li>PWA capabilities</li>
                            <li>Real-time chat</li>
                            <li>Bidding system</li>
                            <li>Multi-user admin panel</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="variant-detail">
                <div class="variant-detail-header">
                    <span class="variant-detail-number">3</span>
                    <h3>Web + Hybrid Mobile</h3>
                </div>
                <p class="variant-detail-desc">Cross-platform reach with web and hybrid mobile apps (React Native), basic QC integration, and enhanced seller tools.</p>
                <div class="variant-detail-metrics">
                    <div class="metric">
                        <span class="metric-label">Timeline</span>
                        <span class="metric-value">22 weeks</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Budget</span>
                        <span class="metric-value">₹9-13L</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Team Size</span>
                        <span class="metric-value">6-8</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Scalability</span>
                        <span class="metric-value">50K users</span>
                    </div>
                </div>
                <div class="variant-detail-content">
                    <div class="variant-tech">
                        <h4>Tech Stack</h4>
                        <div class="tech-tags">
                            <span class="tech-tag-doc">React Native</span>
                            <span class="tech-tag-doc">GraphQL</span>
                            <span class="tech-tag-doc">Elasticsearch</span>
                            <span class="tech-tag-doc">Docker</span>
                        </div>
                    </div>
                    <div class="variant-features">
                        <h4>Key Features</h4>
                        <ul>
                            <li>iOS & Android apps</li>
                            <li>Push notifications</li>
                            <li>QC scheduling system</li>
                            <li>Video calling</li>
                            <li>Advanced analytics</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="variant-detail variant-detail-recommended">
                <span class="recommended-badge-doc">Recommended</span>
                <div class="variant-detail-header">
                    <span class="variant-detail-number">4</span>
                    <h3>Full-Stack Cross-Platform</h3>
                </div>
                <p class="variant-detail-desc">Complete marketplace with native iOS/Android apps, automated QC workflows, hierarchical admin system, and robust payment integration.</p>
                <div class="variant-detail-metrics">
                    <div class="metric">
                        <span class="metric-label">Timeline</span>
                        <span class="metric-value">30 weeks</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Budget</span>
                        <span class="metric-value">₹14-18L</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Team Size</span>
                        <span class="metric-value">8-12</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Scalability</span>
                        <span class="metric-value">500K users</span>
                    </div>
                </div>
                <div class="variant-detail-content">
                    <div class="variant-tech">
                        <h4>Tech Stack</h4>
                        <div class="tech-tags">
                            <span class="tech-tag-doc">Swift/SwiftUI</span>
                            <span class="tech-tag-doc">Kotlin</span>
                            <span class="tech-tag-doc">Microservices</span>
                            <span class="tech-tag-doc">Kubernetes</span>
                            <span class="tech-tag-doc">Redis Cluster</span>
                        </div>
                    </div>
                    <div class="variant-features">
                        <h4>Key Features</h4>
                        <ul>
                            <li>Native iOS & Android</li>
                            <li>Automated QC workflows</li>
                            <li>Full admin hierarchy</li>
                            <li>EMI integration</li>
                            <li>Fraud detection</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="variant-detail">
                <div class="variant-detail-header">
                    <span class="variant-detail-number">5</span>
                    <h3>Enterprise Scale</h3>
                </div>
                <p class="variant-detail-desc">High-performance platform with AI-assisted features, multi-region deployment, advanced analytics, and B2B capabilities.</p>
                <div class="variant-detail-metrics">
                    <div class="metric">
                        <span class="metric-label">Timeline</span>
                        <span class="metric-value">40 weeks</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Budget</span>
                        <span class="metric-value">₹20-25L</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Team Size</span>
                        <span class="metric-value">12-16</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Scalability</span>
                        <span class="metric-value">5M users</span>
                    </div>
                </div>
                <div class="variant-detail-content">
                    <div class="variant-tech">
                        <h4>Tech Stack</h4>
                        <div class="tech-tags">
                            <span class="tech-tag-doc">AI/ML Models</span>
                            <span class="tech-tag-doc">Multi-Region AWS</span>
                            <span class="tech-tag-doc">Apache Kafka</span>
                            <span class="tech-tag-doc">DataDog</span>
                        </div>
                    </div>
                    <div class="variant-features">
                        <h4>Key Features</h4>
                        <ul>
                            <li>AI price recommendations</li>
                            <li>Image recognition</li>
                            <li>B2B marketplace</li>
                            <li>Advanced fraud prevention</li>
                            <li>Enterprise analytics</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="variant-detail">
                <div class="variant-detail-header">
                    <span class="variant-detail-number">6</span>
                    <h3>Global Ecosystem</h3>
                </div>
                <p class="variant-detail-desc">International marketplace with multi-currency, multi-language, advanced AI, blockchain verification, and sustainability tracking.</p>
                <div class="variant-detail-metrics">
                    <div class="metric">
                        <span class="metric-label">Timeline</span>
                        <span class="metric-value">52+ weeks</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Budget</span>
                        <span class="metric-value">₹30L+</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Team Size</span>
                        <span class="metric-value">16+</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Scalability</span>
                        <span class="metric-value">50M+ users</span>
                    </div>
                </div>
                <div class="variant-detail-content">
                    <div class="variant-tech">
                        <h4>Tech Stack</h4>
                        <div class="tech-tags">
                            <span class="tech-tag-doc">Blockchain</span>
                            <span class="tech-tag-doc">Advanced AI</span>
                            <span class="tech-tag-doc">Multi-Region CDN</span>
                            <span class="tech-tag-doc">IoT Integration</span>
                        </div>
                    </div>
                    <div class="variant-features">
                        <h4>Key Features</h4>
                        <ul>
                            <li>Multi-currency support</li>
                            <li>Blockchain verification</li>
                            <li>AR product preview</li>
                            <li>Carbon footprint tracking</li>
                            <li>Global logistics</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="info-callout info-callout-accent">
            <h4>💡 Choosing the Right Variant</h4>
            <p><strong>Variant 4 (Full-Stack Cross-Platform)</strong> is recommended for most businesses as it provides:</p>
            <ul>
                <li>Complete feature set for all user types</li>
                <li>Native mobile experience for maximum engagement</li>
                <li>Scalable architecture supporting 500K+ users</li>
                <li>Professional admin and QC infrastructure</li>
                <li>Clear path to upgrade to Variant 5 as you grow</li>
            </ul>
            <p>Start with Variant 1 or 2 if you need rapid market validation with limited budget, or jump to Variant 5 if you have enterprise backing and multi-region ambitions from day one.</p>
        </div>
    `;
    
    insertBefore.parentNode.insertBefore(section, insertBefore);
}

function loadVariantComparisonSection(insertBefore) {
    const section = document.createElement('section');
    section.id = 'variant-comparison';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">08</span>
            Variant Comparison Matrix
        </h2>

        <div class="section-intro">
            <p class="lead-text">Detailed side-by-side comparison of all implementation variants to help you make an informed decision based on your specific requirements, budget, and timeline.</p>
        </div>

        <div class="execution-table-wrapper">
            <table class="execution-comparison-table">
                <thead>
                    <tr>
                        <th>Aspect</th>
                        <th>Variant 1</th>
                        <th>Variant 2</th>
                        <th>Variant 3</th>
                        <th class="recommended-column">Variant 4 ⭐</th>
                        <th>Variant 5</th>
                        <th>Variant 6</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="table-highlight">Scope</td>
                        <td>Web MVP</td>
                        <td>Enhanced Web</td>
                        <td>Web + Hybrid Mobile</td>
                        <td class="recommended-column">Full Cross-Platform</td>
                        <td>Enterprise Scale</td>
                        <td>Global Ecosystem</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Timeline</td>
                        <td>8 weeks</td>
                        <td>14 weeks</td>
                        <td>22 weeks</td>
                        <td class="recommended-column">30 weeks</td>
                        <td>40 weeks</td>
                        <td>52+ weeks</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Budget (INR)</td>
                        <td>2.5-4L</td>
                        <td>5-7.5L</td>
                        <td>9-13L</td>
                        <td class="recommended-column">14-18L</td>
                        <td>20-25L</td>
                        <td>30L+</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Team Size</td>
                        <td>3-4</td>
                        <td>4-6</td>
                        <td>6-8</td>
                        <td class="recommended-column">8-12</td>
                        <td>12-16</td>
                        <td>16+</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Platforms</td>
                        <td>Web only</td>
                        <td>Web + PWA</td>
                        <td>Web + Hybrid Mobile</td>
                        <td class="recommended-column">Web + Native iOS/Android</td>
                        <td>Multi-region native</td>
                        <td>Global infrastructure</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Categories</td>
                        <td>Electronics only</td>
                        <td>All categories (basic)</td>
                        <td>All categories</td>
                        <td class="recommended-column">All categories (full features)</td>
                        <td>All + advanced features</td>
                        <td>All + innovations</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Admin Panel</td>
                        <td>Basic dashboard</td>
                        <td>Enhanced admin</td>
                        <td>Multi-role admin</td>
                        <td class="recommended-column">Full hierarchical admin</td>
                        <td>Enterprise admin</td>
                        <td>Global governance</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">QC System</td>
                        <td>Manual process</td>
                        <td>Basic scheduling</td>
                        <td>Integrated QC workflow</td>
                        <td class="recommended-column">Full QC automation</td>
                        <td>AI-assisted QC</td>
                        <td>Predictive quality</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Scalability</td>
                        <td>1K users</td>
                        <td>10K users</td>
                        <td>50K users</td>
                        <td class="recommended-column">500K users</td>
                        <td>5M users</td>
                        <td>50M+ users</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Payment Options</td>
                        <td>Basic (UPI, Cards)</td>
                        <td>Multiple gateways</td>
                        <td>Full payment suite</td>
                        <td class="recommended-column">EMI + International</td>
                        <td>B2B payment terms</td>
                        <td>Multi-currency + Crypto</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Communication</td>
                        <td>Basic messaging</td>
                        <td>Real-time chat</td>
                        <td>Video calling</td>
                        <td class="recommended-column">Full communication suite</td>
                        <td>AI chat assistance</td>
                        <td>Multi-language AI support</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Analytics</td>
                        <td>Basic reports</td>
                        <td>Standard analytics</td>
                        <td>Advanced analytics</td>
                        <td class="recommended-column">Comprehensive insights</td>
                        <td>Predictive analytics</td>
                        <td>AI-powered BI</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">AI Features</td>
                        <td>None</td>
                        <td>None</td>
                        <td>Basic recommendations</td>
                        <td class="recommended-column">Smart pricing + Fraud detection</td>
                        <td>Advanced AI/ML</td>
                        <td>Computer vision + NLP</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Security</td>
                        <td>Basic SSL</td>
                        <td>Enhanced security</td>
                        <td>Advanced encryption</td>
                        <td class="recommended-column">Enterprise security</td>
                        <td>SOC 2 compliance</td>
                        <td>Blockchain + Biometric</td>
                    </tr>
                    <tr>
                        <td class="table-highlight">Support</td>
                        <td>Email only</td>
                        <td>Email + Chat</td>
                        <td>Multi-channel</td>
                        <td class="recommended-column">24/7 support system</td>
                        <td>Dedicated account managers</td>
                        <td>Global support centers</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="content-block">
            <h3>Decision Framework</h3>
            
            <h4>Choose Variant 1 if:</h4>
            <ul>
                <li>You need to validate the business model quickly with minimal investment</li>
                <li>Target market is limited to electronics buyback in a specific region</li>
                <li>Budget constraint is under ₹5 lakhs</li>
                <li>You want to test market demand before scaling</li>
            </ul>

            <h4>Choose Variant 2 if:</h4>
            <ul>
                <li>You want full product category coverage from day one</li>
                <li>Primary audience uses desktop/web for marketplace shopping</li>
                <li>PWA can satisfy mobile needs initially</li>
                <li>Budget is ₹5-8 lakhs with 3-4 month timeline</li>
            </ul>

            <h4>Choose Variant 3 if:</h4>
            <ul>
                <li>Mobile presence is essential but native apps aren't critical initially</li>
                <li>You need cross-platform reach within 5-6 months</li>
                <li>Budget allows ₹9-13 lakhs for hybrid approach</li>
                <li>Plan to transition to native apps in later phase</li>
            </ul>

            <h4>Choose Variant 4 (Recommended) if:</h4>
            <ul>
                <li>You want a complete, production-ready marketplace from launch</li>
                <li>Native mobile experience is important for user engagement</li>
                <li>You have ₹14-18 lakhs budget and 7-8 month timeline</li>
                <li>Plan to scale to hundreds of thousands of users</li>
                <li>Need professional admin infrastructure and automated QC</li>
            </ul>

            <h4>Choose Variant 5 if:</h4>
            <ul>
                <li>You have enterprise backing or significant funding</li>
                <li>Multi-region expansion is part of near-term strategy</li>
                <li>AI-powered features are competitive differentiators</li>
                <li>Budget exceeds ₹20 lakhs with 10+ month timeline</li>
                <li>Target is millions of users within 12-18 months</li>
            </ul>

            <h4>Choose Variant 6 if:</h4>
            <ul>
                <li>You're building a global marketplace from inception</li>
                <li>Innovation in sustainability and blockchain verification is core to brand</li>
                <li>Budget is ₹30+ lakhs with 12+ month development cycle</li>
                <li>Long-term vision includes tens of millions of international users</li>
            </ul>
        </div>

        <div class="info-callout">
            <h4>🚀 Phased Approach Recommendation</h4>
            <p>For most startups and businesses, we recommend:</p>
            <ul>
                <li><strong>Phase 1:</strong> Launch with Variant 2 or 3 to validate market fit and gather user feedback (3-6 months)</li>
                <li><strong>Phase 2:</strong> Upgrade to Variant 4 once you have 5K+ active users and proven product-market fit (next 6 months)</li>
                <li><strong>Phase 3:</strong> Scale to Variant 5 when crossing 100K users and expanding to new regions (12-18 months)</li>
                <li><strong>Phase 4:</strong> Evolution to Variant 6 for international dominance (18+ months)</li>
            </ul>
            <p>This phased approach minimizes risk, optimizes cash flow, and ensures each development phase is informed by real user data and market feedback.</p>
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
