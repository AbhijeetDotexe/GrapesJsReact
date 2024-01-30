import React, { useEffect } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage"; 
import './style.css'

function WebBuilder() {
  useEffect(() => {
    const projectID = 1;
    const projectEndpoint = `http://localhost:4000/project/${projectID}`;

    const editor = grapesjs.init({
        
      container: '#gjs',
      height: '700px',
      width: '100%',
      plugins: ['gjs-preset-webpage'],
      deviceManager: {
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '',
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '320px',
            widthMedia: '575px',
          },
        ],
      },
      pluginsOpts: {
        'grapesjs-preset-webpage': {
          blocksBasicOpts: {
            blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video'],
            flexGrid: 1,
          },
          blocks: ['link-block', 'quote', 'text-basic'],
        },
      },      
      storageManager: {
        type: 'remote',
        autosave: true, // Store data automatically
        autoload: true, // Autoload stored data on init
        stepsBeforeSave: 1,
        options: {
          remote: {
            urlLoad: projectEndpoint,
            urlStore: projectEndpoint,
            // The `remote` storage uses the POST method when stores data but
            // the json-server API requires PATCH.
            fetchOptions: opts => (opts.method === 'POST' ?  { method: 'PATCH' } : {}),
            // As the API stores projects in this format `{id: 1, data: projectData }`,
            // we have to properly update the body before the store and extract the
            // project data from the response result.
            onStore: data =>{
              console.log("STORING", JSON.stringify({...data, id: Date.now()}));
              // return {data: JSON.stringify({...data, id: Date.now()})}
              // return { id: projectID, data }},
            },
            onLoad: result => {
              try {
                console.log("LOADING", result);
                // return result.data;
              } catch (error) {
                console.error('Error loading data:', error);
                // throw error; // Rethrow the error to indicate failure
              }
            }
          }
        }
      }
    });

    editor.BlockManager.add('Heading', {
      label: 'Heading',
      category: 'Typography',
      content: `<section><h1 style="">paragraph</h1></section>`,
    });

    editor.BlockManager.add('Paragraph', {
      label: 'Paragraph',
      category: 'Typography',
      content: `<section><p style="">paragraph</p></section>`,
    });

    editor.BlockManager.add('Image', {
      label: 'Image',
      category: 'Media',
      content: { type: 'image' },
    });

    editor.BlockManager.add('Video', {
      label: 'Video',
      category: 'Media',
      content: { type: 'video' },
    });

    editor.BlockManager.add('Audio', {
      label: 'Audio',
      category: 'Media',
      content: `
        <audio controls>
          <source src="" type="audio/ogg">
          <source src="" type="audio/mpeg">
          Your browser does not support the audio tag.
        </audio>
      `,
    });

    editor.BlockManager.add('Navbar', {
      label: 'Navbar',
      category: 'Navigation',
      content: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <!-- Navbar content goes here -->
        </nav>
      `,
    });

    editor.BlockManager.add('Button', {
      label: 'Button',
      category: 'Navigation',
      content: `<button type="button" class="btn">Button</button>`,
    });

    // Additional block managers
    editor.BlockManager.add('CustomBlock1', {
      label: 'Custom Block 1',
      category: 'Custom',
      content: `<div class="custom-block-1">Custom Content 1</div>`,
    });

    editor.BlockManager.add('CustomBlock2', {
      label: 'Custom Block 2',
      category: 'Custom',
      content: `<div class="custom-block-2">Custom Content 2</div>`,
    });
    

    // Cleanup on component unmount
    return () => {
      editor.destroy();
    };
  }, []); // Empty dependency array for componentDidMount behavior

  return <div id="gjs"></div>;
}

export default WebBuilder;
