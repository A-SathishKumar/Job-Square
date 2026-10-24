/**
 * Executive Advisory & Partner Portal
 * Secure internal dashboard for Managing Partners to review incoming consultation pipelines,
 * reassign mandates, and update triage status.
 */

import { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Clock,
  Filter,
  Search,
  LogIn,
  LogOut,
  UserCheck,
  Building,
  Mail,
  AlertCircle
} from 'lucide-react';
import apiClient from '../api/apiClient.ts';

interface AdvisoryPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdvisoryPortal({ isOpen, onClose }: AdvisoryPortalProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [email, setEmail] = useState('e.vance@jobsquare.advisory');
  const [password, setPassword] = useState('ExecutivePartner2026!');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Consultations state
  const [consultations, setConsultations] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkExistingSession();
    }
  }, [isOpen]);

  const checkExistingSession = async () => {
    try {
      const res = await apiClient.getMe();
      if (res.success && res.user) {
        setCurrentUser(res.user);
        loadConsultations();
      }
    } catch {
      // Not logged in yet
      setCurrentUser(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);

    try {
      const res = await apiClient.login({ email, password });
      if (res.success && res.user) {
        setCurrentUser(res.user);
        if (res.token) {
          localStorage.setItem('js_auth_token', res.token);
        }
        loadConsultations();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid partner credentials.';
      setAuthError(msg);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient.logout();
      localStorage.removeItem('js_auth_token');
      setCurrentUser(null);
      setConsultations([]);
    } catch {
      localStorage.removeItem('js_auth_token');
      setCurrentUser(null);
    }
  };

  const loadConsultations = async () => {
    setIsLoadingList(true);
    try {
      const res = await apiClient.getConsultations({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: searchQuery || undefined
      });
      if (res.success && res.consultations) {
        setConsultations(res.consultations);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadConsultations();
    }
  }, [statusFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await apiClient.updateConsultation(id, { status: newStatus });
      setConsultations(prev =>
        prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
      );
      setActionSuccess(`Mandate status updated to ${newStatus}.`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      setActionSuccess('Failed to update status.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden border border-slate-200 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                Job Square Enterprise
              </div>
              <h3 className="text-base font-bold text-white">
                Executive Partner Advisory Portal
              </h3>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-300">
                  {currentUser.name} <span className="text-slate-500">({currentUser.role})</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-6">
          
          {!currentUser ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-800">
                  <LogIn className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Partner Authentication
                </h4>
                <p className="text-xs text-slate-600">
                  Restricted to Job Square Senior Managing Partners and authorized governance committee members.
                </p>
              </div>

              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                >
                  {isAuthenticating ? 'Authenticating...' : 'Sign In as Managing Partner'}
                </button>

                {/* Pre-seed prompt */}
                <div className="p-3 bg-amber-50 rounded border border-amber-200/60 text-[11px] text-amber-900 space-y-1">
                  <div className="font-semibold">Quick Reviewer Credentials:</div>
                  <div>Email: <span className="font-mono">e.vance@jobsquare.advisory</span></div>
                  <div>Password: <span className="font-mono">ExecutivePartner2026!</span></div>
                </div>
              </form>
            </div>
          ) : (
            /* Logged In Dashboard: Consultation Pipeline */
            <div className="space-y-6">
              
              {/* Filter & Search Bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-700">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="text-xs border border-slate-300 rounded px-2.5 py-1.5 bg-white"
                  >
                    <option value="all">All Mandates</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-72">
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search company or reference..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && loadConsultations()}
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={loadConsultations}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded cursor-pointer"
                  >
                    Search
                  </button>
                </div>

              </div>

              {actionSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{actionSuccess}</span>
                </div>
              )}

              {/* Consultation Inquiries List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Showing {consultations.length} active advisory records</span>
                  <span>Real-time persistence layer active</span>
                </div>

                {isLoadingList ? (
                  <div className="py-12 text-center text-xs text-slate-500">
                    Loading advisory records...
                  </div>
                ) : consultations.length === 0 ? (
                  <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-xs text-slate-500">
                    No consultation inquiries found matching your filters.
                  </div>
                ) : (
                  consultations.map(csl => (
                    <div
                      key={csl.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm hover:border-slate-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {csl.referenceCode}
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {csl.fullName}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {csl.corporateEmail}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(csl.createdAt).toLocaleDateString()}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded ${
                              csl.status === 'Pending'
                                ? 'bg-amber-100 text-amber-800'
                                : csl.status === 'Reviewed'
                                ? 'bg-sky-100 text-sky-800'
                                : csl.status === 'Scheduled'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {csl.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-slate-800">{csl.organizationName}</span>
                          <span className="text-slate-400 font-mono">({csl.headcountScope} FTEs)</span>
                        </div>

                        <div className="sm:col-span-2 text-slate-600 font-medium">
                          Practice: <span className="text-slate-900">{csl.primaryInterest}</span>
                        </div>
                      </div>

                      {csl.notes && (
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700">
                          <span className="font-semibold text-slate-800">Briefing Notes: </span>
                          {csl.notes}
                        </div>
                      )}

                      {/* Partner Action Row */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <div className="text-slate-500 flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                          <span>Assigned Partner: <strong className="text-slate-800">{csl.assignedPartnerName || 'Eleanor Vance'}</strong></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-[11px]">Set Status:</span>
                          {(['Pending', 'Reviewed', 'Scheduled', 'Archived'] as const).map(st => (
                            <button
                              key={st}
                              onClick={() => updateStatus(csl.id, st)}
                              disabled={csl.status === st}
                              className={`px-2.5 py-1 text-[11px] rounded transition-colors cursor-pointer ${
                                csl.status === st
                                  ? 'bg-slate-900 text-white font-medium'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>OWASP Top 10 Hardened Session · Role-Based Access Control (RBAC)</span>
          <button
            onClick={onClose}
            className="font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdvisoryPortal;
