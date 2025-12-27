// Netlify Function to proxy uploads to Catbox.moe
// This avoids CORS issues

const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the multipart form data from the request
    const boundary = event.headers['content-type'].split('boundary=')[1];
    const body = Buffer.from(event.body, 'base64');

    // Create form data for Catbox
    const formData = new FormData();
    
    // Extract file from the body
    // Note: This is a simplified version. In production, you might want to use a proper multipart parser
    formData.append('reqtype', 'fileupload');
    
    // Forward the file to Catbox
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': event.headers['content-type']
      }
    });

    const url = await response.text();

    if (!response.ok || url.includes('error') || url.includes('Error')) {
      throw new Error('Upload failed: ' + url);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        success: true, 
        url: url.trim() 
      })
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};

