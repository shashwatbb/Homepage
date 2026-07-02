import React from 'react';
import './Claude.css';
import brainIcon from '../assets/icons/brain.svg';
import bulbIcon from '../assets/icons/lightbulb-filament.svg';

interface ClaudeProps {
  title?: string;
  subtitle?: string;
  onDismiss?: () => void;
}

export const Claude: React.FC<ClaudeProps> = ({
  title = "Find your perfect home",
  subtitle = "AI-powered search just for you",
  onDismiss
}) => {
  return (
    <div className="claude-container">
      <div className="claude-content">
        <div className="claude-header">
          <div className="claude-icon-badge">
            <img src={brainIcon} alt="AI" className="claude-icon" />
          </div>
          <div className="claude-text-group">
            <h2 className="claude-title">{title}</h2>
            <p className="claude-subtitle">{subtitle}</p>
          </div>
          {onDismiss && (
            <button
              className="claude-close"
              onClick={onDismiss}
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Claude;
