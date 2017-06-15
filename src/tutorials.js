const tutorials = [{
  title: 'A Lovely Flight Compute Tutorial',
  description: 'Say hello and do something useful',
  firstStep: 'hello',
  steps: {
    hello: {
      // title: 'Say hello',
      description: `
        <div>
          <p>You should type this:</p>
          <p><code>echo "Hello, world."</code></p>
          <p>I shall reward you with a pegamoose. I promise.</p>
        </div>
      `,
      matches: [{
        inputLine: '$ echo "Hello, world."',
        regexp: false,
        nextStep: 'sinfo',
      }, {
        inputLine: '$ echo "Hello, world"',
        regexp: false,
        showHint: 'Make sure to include the . after world.',
      }],
    },

    sinfo: {
      title: 'WOW! LOOK! A PEGAMOOSE APPEARED!',
      description: `
        <div>
          <img src="https://c1.staticflickr.com/7/6119/6279650182_0f9ac9093e_b.jpg" style="width: 200px"/>
          <p>
            Now try doing something useful, like, I dunno <code>sinfo</code>.
          </p>
        </div>
      `,
      matches: [{
        inputLine: '$ sinfo',
        regexp: false,
        nextStep: 'complete',
      }],
    },

    complete: {
      title: 'YOU SO MAZIN! YOU HAVE MORE PEGAMOOSE!',
      description: `
        <div>
          <img src="https://c1.staticflickr.com/6/5105/5617082954_904c4d7b71_b.jpg" style="width: 200px"/>
        </div>
      `,
    }
  },
}];

export default tutorials;
