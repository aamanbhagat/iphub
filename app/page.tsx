'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Wifi, ExternalLink } from 'lucide-react';

interface IPInfo {
  ipv4?: string;
  ipv6?: string;
  city?: string;
  region?: string;
  country?: string;
}

export default function Home() {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        // Fetch both IPv4 and IPv6 simultaneously
        const [ipv4Response, ipv6Response, locationResponse] = await Promise.allSettled([
          fetch('https://api.ipify.org?format=json'), // IPv4
          fetch('https://api64.ipify.org?format=json'), // IPv6
          fetch('https://ipapi.co/json/') // Location info
        ]);

        const result: IPInfo = {};

        // Get IPv4
        if (ipv4Response.status === 'fulfilled' && ipv4Response.value.ok) {
          const ipv4Data = await ipv4Response.value.json();
          result.ipv4 = ipv4Data.ip;
        }

        // Get IPv6
        if (ipv6Response.status === 'fulfilled' && ipv6Response.value.ok) {
          const ipv6Data = await ipv6Response.value.json();
          result.ipv6 = ipv6Data.ip;
        }

        // Get location info
        if (locationResponse.status === 'fulfilled' && locationResponse.value.ok) {
          const locationData = await locationResponse.value.json();
          result.city = locationData.city;
          result.region = locationData.region;
          result.country = locationData.country_name;
        }

        setIpInfo(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIP();
  }, []);

  const copyToClipboard = async () => {
    if (ipInfo?.ipv4 || ipInfo?.ipv6) {
      try {
        const textToCopy = [
          ipInfo.ipv4 ? `IPv4: ${ipInfo.ipv4}` : '',
          ipInfo.ipv6 ? `IPv6: ${ipInfo.ipv6}` : ''
        ].filter(Boolean).join('\n');
        
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleRandomRedirect = async () => {
    try {
      const response = await fetch('/links.txt');
      const text = await response.text();
      const urls = text.split('\n').filter(url => url.trim() !== '');
      
      if (urls.length > 0) {
        const randomUrl = urls[Math.floor(Math.random() * urls.length)].trim();
        // Ensure URL has protocol
        const finalUrl = randomUrl.startsWith('http') ? randomUrl : `https://${randomUrl}`;
        window.location.href = finalUrl;
      }
    } catch (err) {
      console.error('Failed to fetch random URL:', err);
    }
  };
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Unable to fetch IP</h1>
          <p className="text-slate-600">Please check your connection and try again</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
            <Wifi className="w-7 h-7 text-slate-700" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Your IP Addresses</h1>
          <p className="text-slate-600">Instantly discover your public IPv4 and IPv6 addresses</p>
        </div>

        {/* IP Display Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {/* Random Redirect Button - Always Available */}
          <div className="mb-6">
            <button
              onClick={handleRandomRedirect}
              className="w-full bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center gap-2 font-medium"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Random Site
            </button>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800 mb-4"></div>
              <p className="text-slate-600">Detecting your IP...</p>
            </div>
          ) : (
            <div className="text-center">
              {/* IPv4 Address */}
              {ipInfo?.ipv4 && (
                <div className="mb-6">
                  <p className="text-sm text-slate-500 uppercase tracking-wide font-medium mb-2">IPv4 Address</p>
                  <p className="text-2xl font-mono font-bold text-slate-800 break-all">
                    {ipInfo.ipv4}
                  </p>
                </div>
              )}

              {/* IPv6 Address */}
              {ipInfo?.ipv6 && (
                <div className="mb-6">
                  <p className="text-sm text-slate-500 uppercase tracking-wide font-medium mb-2">IPv6 Address</p>
                  <p className="text-lg font-mono font-bold text-slate-800 break-all">
                    {ipInfo.ipv6}
                  </p>
                </div>
              )}

              {/* No IP Found */}
              {!ipInfo?.ipv4 && !ipInfo?.ipv6 && (
                <div className="mb-6">
                  <p className="text-slate-600">No IP addresses detected</p>
                </div>
              )}

              {/* Location Info */}
              {(ipInfo?.city || ipInfo?.country) && (
                <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500 uppercase tracking-wide font-medium mb-1">Location</p>
                  <p className="text-slate-700">
                    {[ipInfo?.city, ipInfo?.region, ipInfo?.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}

              {/* Copy Button */}
              <button
                onClick={copyToClipboard}
                disabled={!ipInfo?.ipv4 && !ipInfo?.ipv6}
                className="w-full bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy IP Addresses
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            Powered by modern web technologies
          </p>
        </div>
      </div>
    </div>
  );
}