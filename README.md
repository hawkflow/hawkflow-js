![HawkFLow.ai](https://hawkflow.ai/static/images/emails/bars.png)

# HawkFlow.ai

## Monitoring for anyone that writes code

1. Install: `npm install --save hawkflow`
2. Usage:
```javascript
import { HawkFlow } from 'hawkflow';

// Authenticate with your API key
const hf = new HawkFlow({ 
    apiKey: 'YOUR_API_KEY',
});

// Start timing your code - pass through process (required) and meta (optional) parameters
console.log('Sending timing start data to hawkflow');
hf.start({
    process: 'your_process_name',
    meta: 'your_meta_data',
});

// Do some work
console.log('Sleeping for 5 seconds...');
await setTimeout(5000);

// End timing this piece of code - process (required) and meta (optional) parameters should match the start
console.log('Sending timing end data to hawkflow');
hf.end({
    process: 'your_process_name',
    meta: 'your_meta_data',
});
```

More examples: [HawkFlow.ai JS examples](https://github.com/hawkflow/hawkflow-examples/tree/master/js)

Read the docs: [HawkFlow.ai documentation](https://docs.hawkflow.ai/)

## What is HawkFlow.ai?

HawkFlow.ai is a new monitoring platform that makes it easier than ever to make monitoring part of your development
process. Whether you are an Engineer, a Data Scientist, an Analyst, or anyone else that writes code, HawkFlow.ai helps
you and your team take ownership of monitoring.
