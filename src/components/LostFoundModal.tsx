import { useState, useEffect } from 'react';
import { X, Plus, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getLostFoundItems, saveLostFoundItem, updateLostFoundItemStatus, deleteLostFoundItem, type LostFoundItem, getCurrentUser } from '../utils/localStorage';
import { toast } from 'sonner';

interface LostFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'visitor' | 'student' | 'faculty' | null;
}

export default function LostFoundModal({ isOpen, onClose, userType }: LostFoundModalProps) {
  const [view, setView] = useState<'list' | 'report'>('list');
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    type: 'lost' as 'lost' | 'found',
    itemName: '',
    description: '',
    location: '',
    contactInfo: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadItems();
    }
  }, [isOpen]);

  const loadItems = () => {
    const loadedItems = getLostFoundItems();
    setItems(loadedItems);
  };

  const handleSubmitReport = () => {
    if (!newItem.itemName || !newItem.location || !newItem.contactInfo) return;

    const currentUser = getCurrentUser();
    const item: LostFoundItem = {
      id: Date.now().toString(),
      type: newItem.type,
      itemName: newItem.itemName,
      description: newItem.description,
      location: newItem.location,
      date: new Date().toISOString(),
      contactInfo: newItem.contactInfo,
      reportedBy: currentUser?.email || 'anonymous',
      status: 'open'
    };

    saveLostFoundItem(item);
    setNewItem({
      type: 'lost',
      itemName: '',
      description: '',
      location: '',
      contactInfo: ''
    });
    setView('list');
    loadItems();
  };

  const handleMarkResolved = (itemId: string) => {
    updateLostFoundItemStatus(itemId, 'resolved');
    loadItems();
  };

  const handleDeleteItem = (itemId: string) => {
    deleteLostFoundItem(itemId);
    loadItems();
    toast.success('Item deleted successfully');
  };

  const filteredItems = items.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#f59e0b] text-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-lilita text-[24px]">
                    Lost & Found
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="size-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {view === 'list' ? (
                  <div className="space-y-4">
                    {/* Action Buttons */}
                    <div className="flex gap-3 flex-wrap">
                      <Button
                        onClick={() => setView('report')}
                        className="bg-[#f59e0b] hover:bg-[#d97706] text-white"
                      >
                        <Plus className="size-5 mr-2" />
                        Report Item
                      </Button>

                      <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Items</SelectItem>
                          <SelectItem value="lost">Lost Items</SelectItem>
                          <SelectItem value="found">Found Items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3">
                      {filteredItems.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <AlertCircle className="size-12 mx-auto mb-3 opacity-30" />
                          <p>No items reported</p>
                        </div>
                      ) : (
                        filteredItems.map((item) => (
                          <div
                            key={item.id}
                            className={`border-l-4 pl-4 py-3 bg-gray-50 rounded-r-lg ${
                              item.type === 'lost' ? 'border-red-500' : 'border-green-500'
                            } ${item.status === 'resolved' ? 'opacity-60' : ''}`}
                          >
                            <div className="flex justify-between items-start gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-xs px-2 py-1 rounded ${
                                    item.type === 'lost' 
                                      ? 'bg-red-100 text-red-700' 
                                      : 'bg-green-100 text-green-700'
                                  }`}>
                                    {item.type === 'lost' ? 'LOST' : 'FOUND'}
                                  </span>
                                  {item.status === 'resolved' && (
                                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600">
                                      RESOLVED
                                    </span>
                                  )}
                                  <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                                </div>
                                <h4 className="text-gray-900 mb-1">{item.itemName}</h4>
                                {item.description && (
                                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                )}
                                <div className="text-sm text-gray-600">
                                  <p><strong>Location:</strong> {item.location}</p>
                                  <p><strong>Contact:</strong> {item.contactInfo}</p>
                                </div>
                              </div>

                              {item.status === 'open' && userType === 'faculty' && (
                                <button
                                  onClick={() => handleMarkResolved(item.id)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                  title="Mark as resolved"
                                >
                                  <CheckCircle className="size-5" />
                                </button>
                              )}

                              {userType === 'faculty' && (
                                <button
                                  onClick={() => setDeleteConfirm(item.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                  title="Delete item"
                                >
                                  <Trash2 className="size-5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Office Information */}
                    <div className="mt-6 pt-4 border-t bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Lost & Found Office:</strong> Student Services Center, Building B<br />
                        <strong>Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-[#780302] mb-3">Report an Item</h3>

                    <div>
                      <Label htmlFor="itemType">Item Type</Label>
                      <Select value={newItem.type} onValueChange={(value: any) => setNewItem({ ...newItem, type: value })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lost">Lost Item</SelectItem>
                          <SelectItem value="found">Found Item</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="itemName">Item Name</Label>
                      <Input
                        id="itemName"
                        value={newItem.itemName}
                        onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                        placeholder="e.g., Blue backpack, iPhone 13, Student ID"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="itemDescription">Description</Label>
                      <Textarea
                        id="itemDescription"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        placeholder="Provide additional details..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="itemLocation">Location</Label>
                      <Input
                        id="itemLocation"
                        value={newItem.location}
                        onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                        placeholder="Where was it lost/found?"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactInfo">Contact Information</Label>
                      <Input
                        id="contactInfo"
                        value={newItem.contactInfo}
                        onChange={(e) => setNewItem({ ...newItem, contactInfo: e.target.value })}
                        placeholder="Email or phone number"
                        className="mt-1"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={handleSubmitReport}
                        className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-white"
                        disabled={!newItem.itemName || !newItem.location || !newItem.contactInfo}
                      >
                        Submit Report
                      </Button>
                      <Button
                        onClick={() => {
                          setView('list');
                          setNewItem({
                            type: 'lost',
                            itemName: '',
                            description: '',
                            location: '',
                            contactInfo: ''
                          });
                        }}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Delete Confirmation Dialog */}
          <AnimatePresence>
            {deleteConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
                onClick={() => setDeleteConfirm(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full"
                >
                  <h3 className="text-gray-900 mb-3">Confirm Item Deletion</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this item? This action cannot be undone. 
                    {items.find(i => i.id === deleteConfirm)?.type === 'found' && 
                      ' The item has been found and is being removed from the lost & found list.'}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        handleDeleteItem(deleteConfirm);
                        setDeleteConfirm(null);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete Item
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}