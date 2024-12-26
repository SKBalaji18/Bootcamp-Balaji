import React, { useEffect, useState } from 'react';

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const TreeView = ({ disease, hierarchy }) => {
  const [tree, setTree] = useState([]);
  const [collapsed, setCollapsed] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHierarchy = async () => {
      setLoading(true);
      try {
        const response = await fetch(hierarchy?.jstree?.href);
        const data = await response.json();
        setTree(data);
      } catch (error) {
        console.error("Error fetching hierarchy:", error);
      } finally {
        setLoading(false);
      }
    };

    if (disease) fetchHierarchy();
  }, [disease, hierarchy]);

  const getNodeLevel = (node, nodes) => {
    let level = 0;
    let currentParent = node.parent;
    while (currentParent !== '#') {
      level++;
      // eslint-disable-next-line no-loop-func
      const parentNode = nodes.find(n => n.id === currentParent);
      currentParent = parentNode ? parentNode.parent : '#';
    }
    return level;
  };

  const toggleNode = (nodeId) => {
    setCollapsed(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const renderTree = (nodes, parent = '#') => {
    return nodes
      ?.filter(node => node.parent === parent)
      .map(node => {
        const level = getNodeLevel(node, nodes);
        const hasChildren = nodes.some(n => n.parent === node.id);
        const isCurrentDisease = node.text === disease?.label;

        return (
          <div key={node.id} className="tree-node">
            <div 
              className={`tree-node-content ${isCurrentDisease ? 'current-disease' : ''}`}
              style={{ paddingLeft: `${level * 20}px` }}
            >
              {hasChildren && (
                <button 
                  onClick={() => toggleNode(node.id)}
                  className="toggle-button"
                  aria-label={collapsed[node.id] ? "Expand" : "Collapse"}
                >
                  {collapsed[node.id] ? <ChevronRight /> : <ChevronDown />}
                </button>
              )}
              <span className="node-text">
                {node.text}
              </span>
              {isCurrentDisease && (
                <span className="current-badge">
                  Current
                </span>
              )}
            </div>
            {!collapsed[node.id] && (
              <div className="tree-children">
                {renderTree(nodes, node.id)}
              </div>
            )}
          </div>
        );
      });
  };

  return (
    <div className="hierarchy-container">
      <div className="hierarchy-content">
        <h3 className="hierarchy-title">
          <ActivityIcon />
          Disease Hierarchy
        </h3>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="tree-container">
            <div className="tree-scroll">
              {Array.isArray(tree) && tree.length > 0 ? (
                renderTree(tree)
              ) : (
                <p className="no-data">No hierarchy data available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeView;