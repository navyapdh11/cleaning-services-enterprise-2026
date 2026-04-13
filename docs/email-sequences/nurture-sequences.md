# CleanPro Enterprise - Customer Email Nurture Sequences

## Sequence 1: New Customer Onboarding (7 emails over 14 days)

### Email 1: Welcome (Day 0 - Immediate)
**Subject**: Welcome to CleanPro! Your first clean is on us 🎉
**Trigger**: Account registration
**Goal**: Activate first booking

```
Hi {{firstName}},

Welcome to CleanPro Enterprise! We're thrilled to have you join our community of {{totalCustomers}}+ happy customers.

As a welcome gift, your first cleaning is completely FREE (up to $150 value).

👉 Book your free clean: {{bookingLink}}

Here's what makes CleanPro different:
✅ Vetted, trained, and insured professionals
✅ Eco-friendly cleaning products
✅ 100% satisfaction guarantee
✅ Easy online booking and tracking

Have questions? Reply to this email or chat with us at {{supportLink}}.

Here's to a spotless space!
The CleanPro Team
```

### Email 2: First Booking Reminder (Day 2)
**Subject**: Don't forget your free clean is waiting ✨
**Trigger**: No booking made after 2 days
**Goal**: Drive first booking

```
Hi {{firstName}},

Just a friendly nudge—your free cleaning is still available!

Our schedule fills up quickly, so we recommend booking soon to get your preferred date and time.

📅 Choose your slot: {{bookingLink}}

P.S. First-time customers who book within 48 hours get a complimentary fridge clean ($50 value)!
```

### Email 3: Post-First-Clean Follow-up (Day 5-7 after service)
**Subject**: How did we do, {{firstName}}?
**Trigger**: 2 days after first cleaning
**Goal**: Collect review, build loyalty

```
Hi {{firstName}},

We hope you're enjoying your freshly cleaned space! ✨

We'd love to hear about your experience. Your feedback helps us improve and helps others find great cleaners.

⭐ Rate your clean: {{reviewLink}}

As a thank-you for your review, here's 15% off your next booking:
Code: WELCOME15

Book again: {{bookingLink}}

Warmly,
The CleanPro Team
```

### Email 4: Service Education (Day 7)
**Subject**: Did you know we do more than regular cleaning? 🤔
**Trigger**: 7 days after first clean
**Goal**: Upsell additional services

```
Hi {{firstName}},

Many of our customers don't realize we offer a full range of cleaning services:

🏢 **Commercial Cleaning** - Offices, retail, medical
🧹 **Deep Cleaning** - Hard-to-reach areas, seasonal refresh
📦 **Move In/Out** - Transition-ready spaces
🪟 **Window Cleaning** - Inside and out
🧶 **Carpet Cleaning** - Deep extraction for fresh carpets

Each service comes with the same CleanPro guarantee: 100% satisfaction or we'll re-clean for free.

Explore all services: {{servicesLink}}

Best,
The CleanPro Team
```

### Email 5: Referral Ask (Day 10)
**Subject**: Give $30, Get $30 🎁
**Trigger**: 10 days after registration, positive review
**Goal**: Drive referrals

```
Hi {{firstName}},

Great cleaners are hard to find—so we're making it easy to share the love!

Refer a friend and you BOTH get $30 off your next cleaning.

Here's how it works:
1. Share your unique code: {{referralCode}}
2. Your friend books their first clean
3. You both receive $30 credit

Share your code: {{referralLink}}

Our customers who refer friends save an average of $180/year. Start saving today!

Cheers,
The CleanPro Team
```

### Email 6: Loyalty Program Invite (Day 12)
**Subject**: You've been invited to CleanPro Rewards 🏆
**Trigger**: 2+ bookings completed
**Goal**: Enroll in subscription

```
Hi {{firstName}},

You've booked {{bookingCount}} cleans with us—thank you!

As a valued customer, we'd like to invite you to **CleanPro Rewards**:

🌟 Priority booking (skip the waitlist)
🌟 10% off every clean
🌟 Free deep clean every 6th booking
🌟 Dedicated account manager
🌟 Flexible scheduling

Plans start at just $49/month. That's less than one regular clean!

Join Rewards: {{rewardsLink}}

See you at your next clean,
The CleanPro Team
```

### Email 7: Re-engagement (Day 14, no booking in 30 days)
**Subject**: We miss you! Here's 20% off your next clean 💙
**Trigger**: 30 days since last booking
**Goal**: Reactivate dormant customer

```
Hi {{firstName}},

It's been a while since your last CleanPro clean!

We miss you, so here's 20% off your next booking:
Code: COMEBACK20

Book now: {{bookingLink}}

If something wasn't right, we'd love to make it better. Reply to this email and our customer success team will personally follow up.

Hope to see you soon,
The CleanPro Team
```

---

## Sequence 2: Booking Confirmation & Follow-up (4 emails)

### Email 1: Booking Confirmation (Immediate)
**Subject**: Booking Confirmed! Your clean is scheduled ✅
**Trigger**: Booking created
**Goal**: Confirm details, reduce no-shows

```
Hi {{firstName}},

Your cleaning is confirmed! Here are the details:

📅 Date: {{bookingDate}}
⏰ Time: {{bookingTime}}
📍 Address: {{bookingAddress}}
🧹 Service: {{serviceName}}
💰 Total: ${{totalPrice}}

Your cleaner: {{staffName}} (⭐{{staffRating}} rating, {{staffJobs}}+ cleans completed)

Need to reschedule or cancel? No problem—just update your booking in the app:
{{bookingManagementLink}}

Questions? We're here to help: {{supportLink}}

See you soon!
The CleanPro Team
```

### Email 2: 24-Hour Reminder
**Subject**: Your clean is tomorrow at {{bookingTime}} ⏰
**Trigger**: 24 hours before service
**Goal**: Reduce no-shows, prepare customer

```
Hi {{firstName}},

Quick reminder: your cleaning is scheduled for tomorrow at {{bookingTime}}.

To get the best results:
✅ Tidy up loose items (we'll handle the deep clean!)
✅ Secure pets
✅ Provide access (key, code, or be present)
✅ Let us know of any special requests

Your cleaner {{staffName}} is excited to make your space shine!

See you tomorrow,
The CleanPro Team
```

### Email 3: Post-Service Thank You
**Subject**: Your space is sparkling! Thank you ✨
**Trigger**: Service completed
**Goal**: Collect review, drive rebooking

```
Hi {{firstName}},

Great news—your cleaning is complete! {{staffName}} did an amazing job.

We hope you love your freshly cleaned space! If anything isn't perfect, let us know within 24 hours and we'll make it right.

👉 Rate your experience: {{reviewLink}}

Ready for your next clean? Book now and keep the sparkle going:
{{bookingLink}}

As a thank-you, use code CLEAN15 for 15% off your next booking.

Warmly,
The CleanPro Team
```

### Email 4: Payment Receipt
**Subject**: Payment Receipt for your CleanPro service
**Trigger**: Payment processed
**Goal**: Provide documentation, build trust

```
Hi {{firstName}},

Here's your payment receipt:

Invoice #: {{invoiceNumber}}
Date: {{paymentDate}}
Service: {{serviceName}}
Amount: ${{amount}}
Payment Method: {{paymentMethod}}

View full invoice: {{invoiceLink}}

This receipt is also available in your account under Payment History.

Thank you for choosing CleanPro!

The CleanPro Team
```

---

## Sequence 3: Subscription Upsell (3 emails)

### Email 1: Benefits Introduction
**Subject**: What if you never had to think about cleaning again?
**Trigger**: 3+ one-time bookings
**Goal**: Introduce subscription concept

```
Hi {{firstName}},

You've booked {{bookingCount}} cleans with us. You clearly love CleanPro!

What if you could:
🔄 Auto-schedule cleans on your preferred day
💰 Save 15% on every single booking
🌟 Get priority access to top-rated cleaners
🎁 Earn a free deep clean every 6 visits

That's CleanPro Rewards—and it starts at just $49/month.

Learn more: {{rewardsLink}}

No contracts, cancel anytime. Just consistent clean.

The CleanPro Team
```

### Email 2: Social Proof
**Subject**: "Best decision I made this year" - {{customerName}}
**Trigger**: 7 days after Email 1, no conversion
**Goal**: Overcome objections with testimonials

```
Hi {{firstName}},

Don't just take our word for it:

"CleanPro Rewards is the best decision I made this year. I used to spend hours every week finding and scheduling cleaners. Now it's all automated and I save $50/month!" - {{customerName}}, Rewards member since 2025

"Having the same cleaner every time makes such a difference. They know my space and my preferences. It's like having a personal cleaning assistant!" - {{customerName2}}, Rewards member since 2024

Ready to experience the difference?

Join Rewards: {{rewardsLink}}

The CleanPro Team
```

### Email 3: Limited-Time Offer
**Subject**: Last chance: Free month of Rewards ends tonight ⏰
**Trigger**: 14 days after Email 1, no conversion
**Goal**: Create urgency, drive conversion

```
Hi {{firstName}},

This is your last chance to get a **FREE first month** of CleanPro Rewards!

Join by midnight tonight and get:
✅ Your first month FREE ($49 value)
✅ 15% off every clean
✅ Priority booking
✅ Free deep clean every 6th visit

After tonight, this offer expires.

Join Rewards now: {{rewardsLink}}

Don't miss out,
The CleanPro Team
```

---

## Sequence 4: Win-Back (3 emails over 60 days)

### Email 1: We Miss You (Day 60)
**Subject**: It's been 60 days—everything okay?
**Trigger**: 60 days since last booking
**Goal**: Understand churn, reactivate

```
Hi {{firstName}},

We noticed it's been a while since your last CleanPro clean.

Was it something we did? We'd genuinely love to know how we can improve.

📝 Quick 1-minute survey: {{surveyLink}}

And as a welcome-back gift, here's 25% off your next clean:
Code: MISSYOU25

Book now: {{bookingLink}}

Hope to see you soon,
The CleanPro Team
```

### Email 2: What's New (Day 75)
**Subject**: A lot has changed since your last visit!
**Trigger**: 75 days since last booking
**Goal**: Showcase improvements

```
Hi {{firstName}},

Since your last visit, we've made some exciting upgrades:

✨ **New online booking** - Book in 30 seconds
✨ **Real-time tracking** - Know exactly when your cleaner arrives
✨ **Improved quality scores** - 95% of customers rate us 4+ stars
✨ **New services** - Carpet and window cleaning now available
✨ **Better pricing** - More competitive than ever

We'd love for you to experience the new CleanPro.

Come back and save 25%: {{bookingLink}}
Code: COMEBACK25

The CleanPro Team
```

### Email 3: Final Attempt (Day 90)
**Subject**: One last thing, {{firstName}}...
**Trigger**: 90 days since last booking
**Goal**: Final reactivation attempt

```
Hi {{firstName}},

This will be our last email (we promise!). But before we go...

Your account still has ${{loyaltyCredits}} in loyalty credits. They don't expire, but we'd hate for you to forget about them!

Use them on your next clean: {{bookingLink}}

If CleanPro isn't right for you anymore, we completely understand. If there's something we could do better, we'd love to hear from you.

Either way, we wish you all the best!

Warmly,
The CleanPro Team

P.S. We'll be here whenever you need us. Book anytime at {{websiteUrl}}
```

---

## Sequence 5: Seasonal Promotions (4 emails/year)

### Spring Clean (March)
**Subject**: Spring is here—time for a deep clean! 🌸
**Trigger**: March 1
**Offer**: 20% off deep cleaning

### Summer Refresh (June)
**Subject**: Summer-ready spaces start with a clean ☀️
**Trigger**: June 1
**Offer**: Bundle 3 cleans, get 1 free

### Fall Reset (September)
**Subject**: Fall reset: Start fresh this season 🍂
**Trigger**: September 1
**Offer**: Free carpet clean with any deep clean

### Holiday Prep (November)
**Subject**: Get holiday-ready with a spotless space 🎄
**Trigger**: November 1
**Offer**: 30% off move-in/out cleaning

---

## Email Performance Metrics

| Metric | Target |
|--------|--------|
| Open Rate | 25%+ |
| Click Rate | 5%+ |
| Conversion Rate | 2%+ |
| Unsubscribe Rate | <0.5% |
| Revenue per Email | $0.50+ |

---

*All emails should be A/B tested. Subject lines, CTAs, and send times should be optimized based on performance data.*
