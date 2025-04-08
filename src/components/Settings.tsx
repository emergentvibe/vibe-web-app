import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import Button from './ui/Button';
import Input from './ui/Input';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load current API key when component mounts or becomes visible
  useEffect(() => {
    if (isOpen) {
      const loadSettings = async () => {
        try {
          const settings = await storage.getSettings();
          setApiKey(settings.exaApiKey || '');
        } catch (err) {
          console.error('[Settings] Error loading settings:', err);
        }
      };
      
      loadSettings();
    }
  }, [isOpen]);

  // Save API key to storage
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await storage.updateApiKey(apiKey);
      setSuccess(true);
      // Auto-close after successful save
      setTimeout(onClose, 1500);
    } catch (err) {
      setError('Failed to save API key');
      console.error('[Settings] Error saving API key:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        {/* API Key input */}
        <div>
          <Input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            label="Exa API Key"
            placeholder="Enter your Exa API key"
          />
          <p className="mt-1 text-sm text-gray-500">
            Get your API key from{' '}
            <a
              href="https://exa.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300"
            >
              exa.ai
            </a>
          </p>
        </div>

        {/* Status messages */}
        {error && (
          <div className="p-3 bg-red-900/20 text-red-300 rounded-md text-sm shadow-md border border-red-900/30">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-indigo-900/20 text-indigo-300 rounded-md text-sm shadow-md border border-indigo-900/30">
            API key saved successfully!
          </div>
        )}

        {/* Save button */}
        <Button
          onClick={handleSave}
          disabled={isSaving}
          fullWidth
        >
          {isSaving ? 'Saving...' : 'Save API Key'}
        </Button>
      </div>
    </div>
  );
}

export default Settings; 