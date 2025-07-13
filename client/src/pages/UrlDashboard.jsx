import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createShortUrl,
  getAllUrls,
  updateUrl,
  deleteUrl,
  getUrlStats,
  clearError,
  clearStats,
} from "../redux/urlSlice";
import {
  FaCopy,
  FaEdit,
  FaTrash,
  FaLink,
  FaChartBar,
  FaCheck,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const UrlDashboard = () => {
  const dispatch = useDispatch();
  const { urls, loading, error, stats, statsLoading } = useSelector(
    (state) => state.url
  );

  const [originalUrl, setOriginalUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editUrl, setEditUrl] = useState("");
  const [copied, setCopied] = useState(null);
  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    dispatch(getAllUrls());
  }, [dispatch]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!originalUrl) return;
    dispatch(createShortUrl(originalUrl))
      .unwrap()
      .then(() => {
        setOriginalUrl("");
      });
  };

  const handleUpdate = (shortCode) => {
    if (!editUrl) return;
    dispatch(updateUrl({ shortCode, url: editUrl }))
      .unwrap()
      .then(() => {
        setEditingId(null);
      });
  };

  const handleDelete = (shortCode) => {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      dispatch(deleteUrl(shortCode));
    }
  };

  const handleGetStats = (shortCode) => {
    dispatch(getUrlStats(shortCode));
  };

  const copyToClipboard = (text, shortCode) => {
    navigator.clipboard.writeText(text);
    setCopied(shortCode);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            URL Shortener
          </h1>
          <p className="text-gray-600">Create and manage your short URLs</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0"></div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => dispatch(clearError())}
                    className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <span className="sr-only">Dismiss</span>
                    <IoClose className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create URL Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter URL to shorten
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  id="url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Shortening..." : "Shorten URL"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Stats Modal */}
        {stats && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  URL Statistics
                </h3>
                <button
                  onClick={() => dispatch(clearStats())}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <IoClose className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Short Code</p>
                  <p className="font-medium">{stats.shortCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Original URL</p>
                  <a
                    href={stats.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 hover:text-indigo-500 break-all"
                  >
                    {stats.url}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Access Count</p>
                  <p className="font-medium">{stats.accessCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">{formatDate(stats.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{formatDate(stats.updatedAt)}</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => dispatch(clearStats())}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* URLs Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Your Short URLs
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Original URL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Short URL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Clicks
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {urls.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      {loading ? "Loading..." : "No URLs created yet"}
                    </td>
                  </tr>
                ) : (
                  urls.map((url) => (
                    <tr key={url.shortCode} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === url.shortCode ? (
                          <input
                            type="url"
                            value={editUrl}
                            onChange={(e) => setEditUrl(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        ) : (
                          <a
                            href={url.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500 break-all"
                          >
                            {url.url.length > 50
                              ? `${url.url.substring(0, 50)}...`
                              : url.url}
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              copyToClipboard(
                                `${API_BASE.replace("/api", "")}/r/${
                                  url.shortCode
                                }`,
                                url.shortCode
                              )
                            }
                            className="text-gray-400 hover:text-gray-500"
                            title="Copy to clipboard"
                          >
                            {copied === url.shortCode ? (
                              <FaCheck className="h-4 w-4 text-green-500" />
                            ) : (
                              <FaCopy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleGetStats(url.shortCode)}
                          className="flex items-center text-gray-600 hover:text-indigo-600"
                          disabled={statsLoading}
                        >
                          <FaChartBar className="mr-1 h-4 w-4" />
                          {url.accessCount || 0}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(url.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingId === url.shortCode ? (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleUpdate(url.shortCode)}
                              className="text-green-600 hover:text-green-900"
                              disabled={loading}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end space-x-4">
                            <button
                              onClick={() => {
                                setEditingId(url.shortCode);
                                setEditUrl(url.url);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <FaEdit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(url.shortCode)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlDashboard;
