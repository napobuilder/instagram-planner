// Netlify Function to save feed to Blob Storage
const { getStore } = require('@netlify/blobs');

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
    const { feedId, posts } = JSON.parse(event.body);

    if (!feedId || !posts) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'feedId and posts are required' })
      };
    }

    // Get Blob Store
    const store = getStore('feeds');

    // Save feed to Blob Storage
    await store.set(feedId, JSON.stringify(posts), {
      metadata: {
        updatedAt: new Date().toISOString(),
        postCount: posts.length,
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
        message: 'Feed saved successfully'
      })
    };

  } catch (error) {
    console.error('Error saving feed:', error);
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

