import { Shield, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { SafetyCheckResult } from '@/lib/utils';

interface SafetyBadgeProps {
  safety: SafetyCheckResult;
  showDetails?: boolean;
}

export default function SafetyBadge({ safety, showDetails = true }: SafetyBadgeProps) {
  const getSeverityColor = () => {
    switch (safety.severity) {
      case 'safe':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSeverityIcon = () => {
    switch (safety.severity) {
      case 'safe':
        return <Shield className="w-4 h-4" />;
      case 'low':
        return <Info className="w-4 h-4" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4" />;
      case 'high':
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getSeverityText = () => {
    switch (safety.severity) {
      case 'safe':
        return 'Verified Safe';
      case 'low':
        return 'Generally Safe';
      case 'medium':
        return 'Use Caution';
      case 'high':
        return 'Not Recommended';
      case 'critical':
        return 'Unsafe';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-medium ${getSeverityColor()}`}
      >
        {getSeverityIcon()}
        <span>{getSeverityText()}</span>
      </div>

      {showDetails && safety.warnings.length > 0 && (
        <div className="space-y-1">
          {safety.warnings.map((warning, index) => (
            <p key={index} className="text-xs text-gray-600 flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>{warning}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
