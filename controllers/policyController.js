import Policy from "../models/Policy.js";

// Add new policy
export const addPolicy = async (req, res) => {
  try {
    const policy = await Policy.create({ ...req.body, user: req.user._id });
    res.status(201).json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all policies of user
export const getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ user: req.user._id });
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dashboard stats
export const getDashboard = async (req, res) => {
  try {
    const policies = await Policy.find({ user: req.user._id });
    const activePolicies = policies.filter(p => p.status === "active");
    const activeCount = activePolicies.length;
    const totalCoverage = activePolicies.reduce((sum, p) => sum + p.coverageAmount, 0);
    const monthlyPremiums = activePolicies.reduce((sum, p) => {
      if (p.premiumFrequency === "monthly") return sum + p.premiumAmount;
      if (p.premiumFrequency === "yearly") return sum + (p.premiumAmount / 12);
      return sum;
    }, 0);

    const expiringSoon = activePolicies.filter(p => {
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      return new Date(p.endDate) - Date.now() <= oneWeek;
    });

    res.json({ activeCount, totalCoverage, monthlyPremiums, expiringSoon });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
