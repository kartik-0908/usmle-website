const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">StepGenie Privacy Policy</h1>
            <div className="text-gray-600 space-y-1">
              <p><strong>Effective date:</strong> August 15, 2025</p>
              <p><strong>Entity:</strong> MAKAI HEALTH CORP, doing business as StepGenie</p>
              <p><strong>Registered address:</strong> 1412, Market Street, San Francisco - 94102</p>
              <p><strong>Contact:</strong> manav@stepgenie.ai</p>
            </div>
          </header>
          
          <div className="prose max-w-none space-y-8 text-gray-700">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                StepGenie helps learners prepare for the USMLE through AI-powered study tools. We're an education product—not a healthcare provider. Please don't upload real patient data.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1) Quick Summary</h2>
              <div className="space-y-4">
                <p><strong>We collect:</strong> account details (name, email), study activity, content you submit (questions, audio, notes), device and usage data, and limited payment metadata (via trusted processors).</p>
                
                <p><strong>We use data to:</strong> run StepGenie, personalize learning, improve quality, fight abuse, and (with consent) send product updates.</p>
                
                <p><strong>We share with:</strong> service providers (hosting, analytics, payment), affiliates, and when required by law. We don't sell your personal information.</p>
                
                <p><strong>Your choices:</strong> You can access, correct, download, or delete your data. You can opt out of marketing and certain analytics.</p>
                
                <p><strong>Sensitive stuff:</strong> No PHI, please. We're not a HIPAA-covered entity.</p>
                
                <p><strong>For EU/UK/India:</strong> We honor GDPR/DPDP rights and international transfer safeguards.</p>
                
                <p><strong>Minors:</strong> StepGenie is not for children under 13 (or under 16 in some regions).</p>
                
                <p><strong>Training AI:</strong> We do not use your identifiable content to train third-party foundation models without your consent.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2) Scope</h2>
              <p>This Policy explains how we handle personal data when you:</p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>Visit our websites, web apps, or mobile apps</li>
                <li>Create an account or use StepGenie features (e.g., voice, chat, QBank, study plans)</li>
                <li>Interact with us (support, feedback, surveys)</li>
                <li>Receive emails or notifications from us</li>
              </ul>
              <p className="mt-3">This Policy doesn't cover third-party websites/services we link to.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3) What We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">A. Data you provide</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account & Profile:</strong> name, email, password (hashed), avatar, role/status (e.g., IMG, MS2), timezone</li>
                <li><strong>Study Content:</strong> prompts/questions, chat history, audio/voice inputs (if enabled), uploaded files/images, notes, bookmarks, feedback, and your responses within the product</li>
                <li><strong>Preferences:</strong> topics, study goals, reminder/notification settings, beta/consent toggles</li>
                <li><strong>Support & Surveys:</strong> messages, ratings, free-text responses</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">B. Data we get automatically</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Device & Log Data:</strong> IP address, device/browser type, OS, app version, language, referral URLs, pages viewed, clicks, session duration, crash reports, diagnostic logs</li>
                <li><strong>Cookies/SDKs:</strong> identifiers to keep you signed in, remember settings, measure analytics</li>
                <li><strong>Approximate Location:</strong> derived from IP for security, localization, and compliance (no precise GPS unless you enable it explicitly)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">C. Data from others</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Payment Processors:</strong> limited billing metadata and payment status from Stripe/Razorpay/Paddle (we don't store full card numbers)</li>
                <li><strong>Auth Providers:</strong> if you use Google/Apple sign-in, we receive your verified email and profile basics</li>
                <li><strong>Vendors/Partners:</strong> anti-abuse signals, analytics/attribution data (aggregated or pseudonymous)</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-yellow-800">
                  <strong>No PHI:</strong> Please do not upload protected health information. StepGenie is for exam prep only and is not a HIPAA-covered entity or business associate (unless a separate BAA is signed, which is not standard for StepGenie).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4) How We Use Data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Provide the service:</strong> account creation, authentication, core features (chat, voice, QBank), progress tracking, mastery mapping, study plans, and customer support</li>
                <li><strong>Personalize learning:</strong> adapt difficulty, surface weak areas, recommend topics, and tailor explanations</li>
                <li><strong>Product quality & safety:</strong> debugging, monitoring, preventing fraud/abuse, service reliability, and enforcing our Terms</li>
                <li><strong>Analytics & improvement:</strong> understanding feature usage, running A/B tests, improving accuracy/explanations</li>
                <li><strong>Communications:</strong> transactional emails (receipts, security alerts), service announcements, and—with consent—product tips or promotions</li>
                <li><strong>Legal compliance:</strong> tax, accounting, and responding to lawful requests</li>
                <li><strong>AI features:</strong> We may process your interactions to generate responses, hints, and explanations. We may use de-identified/aggregated data to improve models and features. We will not use your identifiable content to train third-party foundation models without your explicit consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5) Legal Bases (EEA/UK)</h2>
              <p>We process personal data under:</p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>Contract (to provide StepGenie you requested)</li>
                <li>Legitimate interests (product improvement, security, anti-abuse, analytics)</li>
                <li>Consent (marketing emails, certain cookies, voice features, model training toggles)</li>
                <li>Legal obligations (tax, compliance)</li>
              </ul>
              <p className="mt-3">You can withdraw consent anytime where applicable.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6) Cookies & Similar Tech</h2>
              <p>We use:</p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>Strictly Necessary (login, security)</li>
                <li>Functional (preferences)</li>
                <li>Analytics (usage metrics)</li>
                <li>(Optional) Marketing (campaign performance)</li>
              </ul>
              <p className="mt-3">Manage cookies via in-product settings and your browser. Region-specific banners may appear where required.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7) How We Share Information</h2>
              <p>We do not sell personal information. We share:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Service Providers/Processors:</strong> hosting (e.g., cloud infrastructure), storage, analytics, logging, email delivery, customer support, payments, voice processing (if enabled)</li>
                <li><strong>Affiliates:</strong> controlled entities supporting StepGenie operations under this Policy</li>
                <li><strong>Legal/Compliance:</strong> to comply with law, enforce terms, or protect rights/safety</li>
                <li><strong>Business Transfers:</strong> merger, acquisition, financing, or sale; we'll notify you where required</li>
              </ul>
              <p className="mt-3">Third parties must follow confidentiality and security obligations consistent with this Policy and applicable law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8) International Data Transfers</h2>
              <p>We operate globally. If you're in the EEA/UK/Switzerland, we rely on appropriate safeguards (e.g., SCCs/IDTA) for transfers to countries like the U.S. We maintain additional technical and organizational measures to protect your data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9) Data Retention</h2>
              <p>We keep personal data only as long as needed for the purposes above, then delete or de-identify it.</p>
              <p className="mt-3"><strong>Typical periods (subject to change):</strong></p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Account profile & study history: active account + up to 24 months</li>
                <li>Session & device logs: 12–18 months</li>
                <li>Audio/voice recordings (if enabled): 30–180 days (configurable) or sooner if you delete</li>
                <li>Payment/billing records: 7 years (tax/audit)</li>
                <li>Backups: rolling cycles per our disaster recovery policy</li>
              </ul>
              <p className="mt-3">You can request deletion at any time (see Your Rights).</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10) Security</h2>
              <p>We use industry-standard safeguards: encryption in transit and at rest, least-privilege access, monitoring, secure development practices, and vendor due diligence. No system is 100% secure; report concerns to manav@stepgenie.com.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11) Your Rights & Choices</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Global (applies broadly)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access, correct, download (portability), and delete your data</li>
                <li>Object to or restrict certain processing (where applicable)</li>
                <li>Opt out of marketing emails and (where offered) analytics/ads cookies</li>
                <li>Manage voice/recording features and data retention (if enabled)</li>
              </ul>
              <p className="mt-3">Request via manav@stepgenie.com or in-product settings. We may verify your identity.</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">EEA/UK (GDPR)</h3>
              <p>Rights above plus the right to lodge a complaint with your local Supervisory Authority.</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">California (CPRA)</h3>
              <p>Right to know/access, correct, delete, and opt out of "sale" or "sharing" (we do not sell; limited "sharing" may occur for analytics/ads if enabled).</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Other U.S. States</h3>
              <p>We provide access, correction, deletion, and opt-out of targeted advertising and certain profiling where required. Use in-product controls or contact us.</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">India (DPDP)</h3>
              <p>Right to access, correction, erasure, grievance redressal.</p>
              <p className="mt-2"><strong>Contact our Grievance Officer:</strong> Dr. Manav Chandnani available at manav@stepgenie.app</p>
              <p>You may escalate unresolved complaints to the Data Protection Board of India as per law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12) Children's Privacy</h2>
              <p>StepGenie is not for children under 13 (or under 16 where consent laws apply). We don't knowingly collect data from them. If you believe a child provided data, contact us to delete it.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13) Automated Decision-Making</h2>
              <p>We use AI to generate explanations, hints, and study plans. These do not produce legal or similarly significant effects about you. You may request human review of significant decisions (if any arise) and can opt out of certain personalization where offered.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14) Third-Party Services & Links</h2>
              <p>Our product may link to or integrate with third-party sites (e.g., video hosting, sign-in, payments). Their privacy practices are their own; review their policies.</p>
              <p className="mt-3"><strong>Payments:</strong> We use processors like Stripe/Razorpay/Paddle. They handle your payment details under their policies. We receive limited billing metadata; we don't store full card numbers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15) Do Not Track / Global Privacy Control</h2>
              <p>Some browsers send Do Not Track or GPC signals. We honor applicable opt-out signals where required by law (e.g., Colorado UOOM). Otherwise, behavior may vary by region and feature.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16) Changes to This Policy</h2>
              <p>We'll update this Policy as our services and laws evolve. If changes are material, we'll notify you (e.g., email or in-app). Continued use means you accept the updated Policy.</p>
              <p className="mt-3 text-sm text-gray-600"><strong>Version:</strong> v1.0 • <strong>Last updated:</strong> August 15, 2025</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">17) Contact Us</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>General privacy requests:</strong> manav@stepgenie.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;