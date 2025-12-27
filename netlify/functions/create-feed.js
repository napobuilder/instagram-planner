// Netlify Function to create a new feed and return feedId
const { getStore } = require('@netlify/blobs');
const crypto = require('crypto');

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Generate unique feedId
    const feedId = crypto.randomBytes(8).toString('hex');

    // Get Blob Store
    const store = getStore('feeds');

    // Create empty feed
    const initialPosts = [];
    await store.set(feedId, JSON.stringify(initialPosts), {
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        postCount: 0,
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        success: true,
        feedId,
        message: 'Feed created successfully'
      })
    };

  } catch (error) {
    console.error('Error creating feed:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};

