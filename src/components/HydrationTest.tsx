import React, { useState, useEffect } from 'react'

/**
 * Phase 1: Hydration Test Component
 * Tests various hydration scenarios to identify issues
 */
interface HydrationTestProps {
  testLevel?: 'basic' | 'state' | 'effect' | 'full'
}

const HydrationTest: React.FC<HydrationTestProps> = ({ testLevel = 'basic' }) => {
  const [clientState, setClientState] = useState<string>('initial')
  const [hydrationTime, setHydrationTime] = useState<string>('')
  const [renderCount, setRenderCount] = useState(0)

  // Track renders
  React.useEffect(() => {
    setRenderCount(prev => prev + 1)
    console.log('🔄 HydrationTest render #', renderCount + 1)
  })

  useEffect(() => {
    console.log('⚡ HydrationTest useEffect triggered')
    setClientState('hydrated')
    setHydrationTime(new Date().toISOString())
    
    // Test DOM manipulation
    const element = document.getElementById('hydration-test-marker')
    if (element) {
      element.textContent = 'Client-side updated!'
      console.log('✅ DOM manipulation successful')
    } else {
      console.error('❌ Could not find hydration test marker')
    }
  }, [])

  if (testLevel === 'basic') {
    return (
      <div style={{ padding: '10px', border: '2px solid #4CAF50', margin: '10px 0' }}>
        <h3>🧪 Basic Hydration Test</h3>
        <p>This should render both on server and client.</p>
        <div id="hydration-test-marker">Server-side content</div>
      </div>
    )
  }

  if (testLevel === 'state') {
    return (
      <div style={{ padding: '10px', border: '2px solid #2196F3', margin: '10px 0' }}>
        <h3>🧪 State Hydration Test</h3>
        <p>Client state: {clientState}</p>
        <p>Render count: {renderCount}</p>
        <button onClick={() => setClientState('clicked')}>
          Test State Update
        </button>
      </div>
    )
  }

  if (testLevel === 'effect') {
    return (
      <div style={{ padding: '10px', border: '2px solid #FF9800', margin: '10px 0' }}>
        <h3>🧪 Effect Hydration Test</h3>
        <p>Client state: {clientState}</p>
        <p>Hydration time: {hydrationTime}</p>
        <div id="hydration-test-marker">Server-side content</div>
      </div>
    )
  }

  // Full test
  return (
    <div style={{ padding: '10px', border: '2px solid #9C27B0', margin: '10px 0' }}>
      <h3>🧪 Full Hydration Test Suite</h3>
      <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <strong>Server/Client State:</strong>
          <ul>
            <li>State: {clientState}</li>
            <li>Renders: {renderCount}</li>
            <li>Hydrated: {hydrationTime}</li>
          </ul>
        </div>
        <div>
          <strong>Interactive Tests:</strong>
          <button 
            onClick={() => setClientState('updated')}
            style={{ display: 'block', margin: '5px 0' }}
          >
            Update State
          </button>
          <button 
            onClick={() => console.log('Button click successful')}
            style={{ display: 'block', margin: '5px 0' }}
          >
            Console Log Test
          </button>
        </div>
      </div>
      <div 
        id="hydration-test-marker" 
        style={{ marginTop: '10px', padding: '5px', background: '#f0f0f0' }}
      >
        Server-side content
      </div>
    </div>
  )
}

export default HydrationTest