import React, { useState } from 'react';
import { Check, Zap, Star, Crown, Calculator } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const SubscriptionPlans: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [showCalculator, setShowCalculator] = useState(false);
  const { t } = useLanguage();

  const plans = [
    {
      name: t('subscription.basic'),
      icon: <Zap className="w-6 h-6" />,
      price: { monthly: 99, yearly: 999 },
      color: 'bg-blue-600',
      features: [
        'Project Database Access',
        'Basic Risk Indicators',
        'Standard Reporting',
        'Email Support',
        'Up to 10 Projects',
        'Basic KPI Tracking',
        'Mobile App Access',
        'Community Forum',
      ],
      limitations: [
        'Limited to 10 projects',
        'Basic risk indicators only',
        'Standard support',
      ],
    },
    {
      name: t('subscription.pro'),
      icon: <Star className="w-6 h-6" />,
      price: { monthly: 299, yearly: 3199 },
      color: 'bg-purple-600',
      popular: true,
      features: [
        'Everything in Basic',
        'Advanced Analytics',
        'Interactive Project Map',
        'AI-Powered Insights',
        'Priority Support',
        'Up to 50 Projects',
        'Advanced KPI Tracking',
        'API Access',
        'Custom Reports',
        'Data Export',
        'Collaboration Tools',
        'Gender Audit Module',
      ],
      limitations: [
        'Limited to 50 projects',
        'Standard AI features',
      ],
    },
    {
      name: t('subscription.enterprise'),
      icon: <Crown className="w-6 h-6" />,
      price: { monthly: 599, yearly: 6399 },
      color: 'bg-orange-600',
      features: [
        'Everything in Pro',
        'Unlimited Projects',
        'Advanced AI Onboarding',
        'Custom Integration',
        'Dedicated Account Manager',
        'White-label Options',
        'Advanced Security',
        'SLA Guarantee',
        'Custom Training',
        'Advanced Analytics',
        'Multi-language Support',
        'Outcome-based Pricing',
        'Data Marketplace Access',
        'Third-party Integrations',
      ],
      limitations: [],
    },
  ];

  const addOns = [
    {
      name: 'Data Marketplace License',
      price: 199,
      description: 'Access to buy/sell development data with digital licensing',
    },
    {
      name: 'Advanced Security Package',
      price: 149,
      description: 'Enhanced security features and monitoring for high-risk areas',
    },
    {
      name: 'Custom Integration',
      price: 299,
      description: 'Custom API integrations with your existing systems',
    },
    {
      name: 'Training & Onboarding',
      price: 399,
      description: 'Comprehensive training program for your team',
    },
  ];

  const OutcomeBasedCalculator = () => {
    const [projectType, setProjectType] = useState('water');
    const [beneficiaries, setBeneficiaries] = useState(1000);
    const [duration, setDuration] = useState(12);
    const [riskLevel, setRiskLevel] = useState('medium');

    const calculatePrice = () => {
      const baseRates = {
        water: 50,
        health: 75,
        education: 40,
        agriculture: 30,
      };

      const riskMultipliers = {
        low: 1.0,
        medium: 1.2,
        high: 1.5,
      };

      const basePrice = baseRates[projectType] * beneficiaries * (duration / 12);
      const riskAdjustedPrice = basePrice * riskMultipliers[riskLevel];
      
      return Math.round(riskAdjustedPrice);
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Outcome-Based Pricing Calculator
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Type
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="water">Water & Sanitation</option>
              <option value="health">Healthcare</option>
              <option value="education">Education</option>
              <option value="agriculture">Agriculture</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Beneficiaries
            </label>
            <input
              type="number"
              value={beneficiaries}
              onChange={(e) => setBeneficiaries(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (months)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Risk Level
            </label>
            <select
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">
                Estimated Price:
              </span>
              <span className="text-2xl font-bold text-blue-600">
                ${calculatePrice().toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Based on outcome achievement and risk assessment
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Flexible pricing options for organizations of all sizes
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              billingPeriod === 'yearly' ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Yearly
          </span>
          {billingPeriod === 'yearly' && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              Save 15%
            </span>
          )}
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-sm border-2 ${
              plan.popular ? 'border-purple-500' : 'border-gray-200'
            } relative overflow-hidden`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 bg-purple-500 text-white text-center py-2 text-sm font-medium">
                Most Popular
              </div>
            )}
            
            <div className={`p-6 ${plan.popular ? 'pt-14' : ''}`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${plan.color}`}>
                  <div className="text-white">
                    {plan.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price[billingPeriod].toLocaleString()}
                  </span>
                  <span className="text-gray-600">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {billingPeriod === 'yearly' && (
                  <p className="text-sm text-gray-600 mt-1">
                    ${Math.round(plan.price.yearly / 12).toLocaleString()}/month billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Contact Sales
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add-ons & Extensions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {addOns.map((addon, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{addon.name}</h3>
                <span className="text-xl font-bold text-gray-900">${addon.price}/month</span>
              </div>
              <p className="text-gray-600 mb-4">{addon.description}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Contact Sales
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome-based Pricing */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Outcome-Based Pricing
          </h2>
          <p className="text-gray-600">
            Pay based on actual results and impact achieved
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How It Works
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Define Outcomes</h4>
                  <p className="text-sm text-gray-600">Set clear, measurable project outcomes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Track Progress</h4>
                  <p className="text-sm text-gray-600">Monitor performance with real-time KPIs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Pay for Results</h4>
                  <p className="text-sm text-gray-600">Payment based on achieved outcomes</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculate Outcome-Based Pricing</span>
            </button>
            
            {showCalculator && <OutcomeBasedCalculator />}
          </div>
        </div>
      </div>

      {/* Data Marketplace */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Data Marketplace
        </h2>
        <p className="text-gray-600 mb-6">
          Monetize your development data through our secure marketplace with digital licensing
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Sell Data</h3>
            <p className="text-sm text-gray-600">Earn revenue from your project data</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Buy Insights</h3>
            <p className="text-sm text-gray-600">Access valuable development datasets</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Digital Licensing</h3>
            <p className="text-sm text-gray-600">Secure, automated licensing system</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Explore Marketplace
        </button>
      </div>
    </div>
  );
};