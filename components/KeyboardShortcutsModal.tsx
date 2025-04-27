import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Home, Bookmark, Bell, FileText, Zap, MousePointer, ArrowLeft, ArrowRight } from 'lucide-react';

interface ShortcutGroup {
  title: string;
  shortcuts: {
    keys: string[];
    description: string;
    icon?: React.ComponentType<any>;
  }[];
}

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  // Shortcut data organized by groups
  const shortcutGroups: ShortcutGroup[] = [
    {
      title: "Navigation",
      shortcuts: [
        { 
          keys: ["g", "h"],
          description: "Go to Home page",
          icon: Home
        },
        { 
          keys: ["g", "e"],
          description: "Go to Explore page",
          icon: Search
        },
        { 
          keys: ["g", "l"],
          description: "Go to Library",
          icon: Bookmark
        },
        { 
          keys: ["g", "n"],
          description: "Go to Notifications",
          icon: Bell
        },
        { 
          keys: ["g", "p"],
          description: "Go to Profile",
          icon: FileText
        }
      ]
    },
    {
      title: "Research Papers",
      shortcuts: [
        { 
          keys: ["s"],
          description: "Save paper to library",
          icon: Bookmark
        },
        { 
          keys: ["f"],
          description: "Toggle full text view",
          icon: FileText
        },
        { 
          keys: ["j", "k"],
          description: "Move between search results",
          icon: MousePointer
        },
        { 
          keys: ["o"],
          description: "Open selected paper"
        },
        {
          keys: ["ArrowLeft"],
          description: "Previous page in paper",
          icon: ArrowLeft
        },
        {
          keys: ["ArrowRight"],
          description: "Next page in paper",
          icon: ArrowRight
        }
      ]
    },
    {
      title: "General",
      shortcuts: [
        { 
          keys: ["/"],
          description: "Focus search",
          icon: Search
        },
        { 
          keys: ["?"],
          description: "Open keyboard shortcuts",
          icon: Zap
        },
        { 
          keys: ["Esc"],
          description: "Close modal or dismiss"
        }
      ]
    }
  ];

  // Animation variants for the modal
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, delay: 0.1 }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: -10
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: { 
        duration: 0.2
      }
    }
  };

  // Function to render individual key
  const renderKey = (key: string) => {
    // Special key display names
    const keyDisplay: Record<string, string> = {
      "ArrowLeft": "←",
      "ArrowRight": "→",
      "ArrowUp": "↑",
      "ArrowDown": "↓",
      "Esc": "Esc",
    };

    return (
      <kbd
        key={key}
        className="inline-flex items-center justify-center min-w-[1.8rem] h-7 px-2
                   border border-border rounded-md font-mono text-sm font-bold
                   bg-muted shadow-sm"
      >
        {keyDisplay[key] || key}
      </kbd>
    );
  };

  // Split shortcut groups into two columns
  const getColumnGroups = () => {
    const midpoint = Math.ceil(shortcutGroups.length / 2);
    return [
      shortcutGroups.slice(0, midpoint),
      shortcutGroups.slice(midpoint)
    ];
  };

  const [leftColumnGroups, rightColumnGroups] = getColumnGroups();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay that closes when clicked */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
            <motion.div
              className="w-full max-w-5xl max-h-[80vh] bg-card border border-border rounded-lg shadow-xl overflow-hidden pointer-events-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-xl font-semibold flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" /> 
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close shortcuts modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal content - Two-column layout with conditional scrolling */}
              <div className="overflow-y-visible">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {/* Left column */}
                  <div>
                    {leftColumnGroups.map((group, groupIndex) => (
                      <motion.div
                        key={group.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: groupIndex * 0.1, duration: 0.3 }}
                        className="mb-4"
                      >
                        <h3 className="text-md font-medium text-primary mb-2 px-1">
                          {group.title}
                        </h3>
                        <div className="bg-card rounded-lg border border-border shadow-sm">
                          {group.shortcuts.map((shortcut, index) => (
                            <div 
                              key={`${group.title}-${index}`}
                              className={`
                                flex items-center p-3
                                ${index !== group.shortcuts.length - 1 ? 'border-b border-border' : ''}
                                hover:bg-muted/50 transition-colors duration-150
                              `}
                            >
                              {/* Keys first */}
                              <div className="flex-shrink-0 w-24 flex items-center">
                                {shortcut.keys.map((key, keyIndex) => (
                                  <React.Fragment key={keyIndex}>
                                    {keyIndex > 0 && <span className="mx-1 text-muted-foreground">+</span>}
                                    {renderKey(key)}
                                  </React.Fragment>
                                ))}
                              </div>
                              
                              {/* Description */}
                              <div className="flex items-center ml-6">
                                {shortcut.icon && (
                                  <shortcut.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="text-sm">{shortcut.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right column */}
                  <div>
                    {rightColumnGroups.map((group, groupIndex) => (
                      <motion.div
                        key={group.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (groupIndex + leftColumnGroups.length) * 0.1, duration: 0.3 }}
                        className="mb-4"
                      >
                        <h3 className="text-md font-medium text-primary mb-2 px-1">
                          {group.title}
                        </h3>
                        <div className="bg-card rounded-lg border border-border shadow-sm">
                          {group.shortcuts.map((shortcut, index) => (
                            <div 
                              key={`${group.title}-${index}`}
                              className={`
                                flex items-center p-3
                                ${index !== group.shortcuts.length - 1 ? 'border-b border-border' : ''}
                                hover:bg-muted/50 transition-colors duration-150
                              `}
                            >
                              {/* Keys first */}
                              <div className="flex-shrink-0 w-24 flex items-center">
                                {shortcut.keys.map((key, keyIndex) => (
                                  <React.Fragment key={keyIndex}>
                                    {keyIndex > 0 && <span className="mx-1 text-muted-foreground">+</span>}
                                    {renderKey(key)}
                                  </React.Fragment>
                                ))}
                              </div>
                              
                              {/* Description */}
                              <div className="flex items-center ml-6">
                                {shortcut.icon && (
                                  <shortcut.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="text-sm">{shortcut.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-4 border-t border-border bg-muted/30">
                <p className="text-sm text-muted-foreground text-center">
                  Press <kbd className="inline-flex items-center justify-center min-w-[1.8rem] h-6 px-1.5 
                  border border-border rounded-md font-mono text-xs font-bold 
                  bg-background shadow-sm">?</kbd> anywhere to open this dialog
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcutsModal;