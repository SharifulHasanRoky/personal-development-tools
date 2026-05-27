'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { useAppStore } from '@/stores/appStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import {
  DollarSign,
  Plus,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  BarChart3,
} from 'lucide-react'

export default function FinancePage() {
  const { transactions, addTransaction, deleteTransaction } = useAppStore()
  const [showModal, setShowModal] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  })

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const netBalance = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0

  // Category spending
  const categorySpending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  const expenseCategories = ['Rent', 'Food', 'Transport', 'Education', 'Entertainment', 'Health', 'Shopping', 'Bills', 'Other']
  const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Business', 'Other']

  const handleAdd = () => {
    if (!newTransaction.amount || !newTransaction.category) return
    addTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      userId: '1',
    })
    setNewTransaction({ type: 'expense', amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] })
    setShowModal(false)
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-7 h-7 text-accent-500" />
              Finance Dashboard
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Track income, expenses, and grow your wealth
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> Add Transaction
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card padding="sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent-500" />
              </div>
              <span className="text-xs text-surface-500">Income</span>
            </div>
            <p className="text-xl font-bold text-accent-600 dark:text-accent-400">${totalIncome.toLocaleString()}</p>
          </Card>
          <Card padding="sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-xs text-surface-500">Expenses</span>
            </div>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">${totalExpenses.toLocaleString()}</p>
          </Card>
          <Card padding="sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-primary-500" />
              </div>
              <span className="text-xs text-surface-500">Net Balance</span>
            </div>
            <p className={`text-xl font-bold ${netBalance >= 0 ? 'text-accent-600 dark:text-accent-400' : 'text-red-600 dark:text-red-400'}`}>
              ${netBalance.toLocaleString()}
            </p>
          </Card>
          <Card padding="sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <PiggyBank className="w-4 h-4 text-yellow-500" />
              </div>
              <span className="text-xs text-surface-500">Savings Rate</span>
            </div>
            <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{savingsRate}%</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions List */}
          <div className="lg:col-span-2">
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {transactions.slice().reverse().map((t) => (
                  <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      t.type === 'income' ? 'bg-accent-100 dark:bg-accent-900/30' : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {t.type === 'income' ? (
                        <ArrowUpRight className="w-4 h-4 text-accent-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{t.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" size="sm">{t.category}</Badge>
                        <span className="text-xs text-surface-500">{new Date(t.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-accent-500' : 'text-red-500'}`}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                    </span>
                    <button onClick={() => deleteTransaction(t.id)} className="p-1 text-surface-400 hover:text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-4">
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary-500" />
                Spending by Category
              </h3>
              <div className="space-y-3">
                {Object.entries(categorySpending)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, amount]) => (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-surface-600 dark:text-surface-400">{category}</span>
                        <span className="text-sm font-medium text-surface-900 dark:text-white">${amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                          style={{ width: `${(amount / totalExpenses) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            {/* AI Insight */}
            <Card variant="glass" className="border-primary-200/50 dark:border-primary-800/30">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-accent-500" />
                <h4 className="text-sm font-semibold text-surface-900 dark:text-white">AI Finance Tip</h4>
              </div>
              <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                Your savings rate of {savingsRate}% is {savingsRate >= 20 ? 'great' : 'below the recommended 20%'}. 
                {savingsRate < 20 ? ' Try reducing discretionary spending by $200/month to hit your savings goal faster.' : ' Keep it up! Consider investing the surplus.'}
              </p>
            </Card>
          </div>
        </div>

        {/* Add Transaction Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Transaction" size="md">
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setNewTransaction({ ...newTransaction, type: 'income', category: '' })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  newTransaction.type === 'income' ? 'bg-accent-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setNewTransaction({ ...newTransaction, type: 'expense', category: '' })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  newTransaction.type === 'expense' ? 'bg-red-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                }`}
              >
                Expense
              </button>
            </div>
            <Input
              label="Amount ($)"
              type="number"
              placeholder="0.00"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Category</label>
              <div className="flex flex-wrap gap-2">
                {(newTransaction.type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewTransaction({ ...newTransaction, category: cat })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      newTransaction.category === cat ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Description"
              placeholder="What's this for?"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            />
            <Input
              label="Date"
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            />
            <Button onClick={handleAdd} className="w-full">
              <Plus className="w-4 h-4" /> Add Transaction
            </Button>
          </div>
        </Modal>
      </div>
    </MainLayout>
  )
}
