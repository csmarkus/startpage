import { useLocalSettings } from '../hooks/useLocalSettings';
import type { Settings as SettingsType } from '../types/settings';

interface SettingsProps {
  settings: SettingsType;
  onSave: (newSettings: SettingsType) => void;
}

const Settings = ({ settings, onSave }: SettingsProps) => {
  const { localSettings, handleChange, handleSave, isSaved } = useLocalSettings(settings, onSave);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 w-full transition-colors">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Settings</h2>
      </div>

      <div className="space-y-8">
        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">Theme</label>
          <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            {(['light', 'dark', 'system'] as const).map((t) => (
              <button
                key={t}
                onClick={() => handleChange('theme', t)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  localSettings.theme === t
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Background Query */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">Background Image Query</label>
          <input
            type="text"
            value={localSettings.backgroundQuery}
            onChange={(e) => handleChange('backgroundQuery', e.target.value)}
            placeholder="e.g. mountains, nature, architecture"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <p className="mt-2 text-xs text-zinc-400">
            Keywords to search Unsplash for. Changes will apply on next refresh or save.
          </p>
        </div>

        {/* Unsplash API Key */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">Unsplash API Key</label>
          <input
            type="password"
            value={localSettings.unsplashApiKey || ''}
            onChange={(e) => handleChange('unsplashApiKey', e.target.value)}
            placeholder="Enter your Unsplash Access Key"
            data-1p-ignore
            autoComplete="off"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <p className="mt-2 text-xs text-zinc-400">
            Required for background images. Get one at <a href="https://unsplash.com/developers" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">unsplash.com/developers</a>
          </p>
        </div>

        <button
          onClick={handleSave}
          className={`w-full py-3 rounded-xl transition-all font-medium ${
            isSaved 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
          }`}
        >
          {isSaved ? 'Changes Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
