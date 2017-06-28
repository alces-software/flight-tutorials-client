// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import type { TutorialType } from './types';

const tutorials: Array<TutorialType> = [{
  title: 'A Lovely Flight Tutorial',
  description: 'Say hello and do something useful',
  firstStep: 'hello',
  steps: {
    hello: {
      title: 'Say hello to the world',
      description: `
You should type this:

\`\`\`
echo "Hello, world."
\`\`\`

I shall reward you with a pegamoose. I promise.
      `,
      matches: [{
        inputLine: 'echo "Hello, world."',
        anchored: true,
        regexp: false,
        nextStep: 'sinfo',
      // }, {
      //   inputLine: '$ echo "Hello, world"',
      //   regexp: false,
      //   showHint: 'Make sure to include the . after world.',
      }],
    },

    sinfo: {
      title: 'Run a useful command',
      description: `
WOW! LOOK! A PEGAMOOSE APPEARED!

<img src="https://c1.staticflickr.com/7/6119/6279650182_0f9ac9093e_b.jpg" style="width: 200px" />

<p></p>

Now try doing something useful, like, I dunno \`sinfo\`.
      `,
      matches: [{
        inputLine: 'sinfo',
        anchored: true,
        regexp: false,
        nextStep: 'complete',
      }],
    },

    complete: {
      title: 'Your final reward',
      description: `
YOU SO **MAZIN!** YOU HAVE MORE PEGAMOOSE!

<img src="https://c1.staticflickr.com/6/5105/5617082954_904c4d7b71_b.jpg" style="width: 200px"/>

<p></p>

You're all done now. Goodbye!
      `,
      matches: [],
    },
  },
}, {

  title: 'Click & Cloud Challenge',
  description: `
You are about to use a HPC cluster to run a parallel program using a
Message Passing Interface (MPI).  MPI is commonly used on compute
clusters as a means by which a set of related processes can work
together in parallel on one or more tasks.  In this environment the
computers do not share any memory, so the only way to communicate data
and other information is by passing messages between each other.

In this challenge you will run a job script that anonymizes your email
address and passes that information to an MPI program which, through a
series of messages passed between compute nodes, will increase the
letter or numerical value of your anonymized email address by three.

After the process has completed you will receive an email containing
your results.
  `,
  firstStep: 'installSoftware',

  steps: {
    installSoftware: {
      title: 'Install your software',
      description: `
Once logged in, the first thing you'll need to do is install a piece
of software from the Alces Gridware application library, in this
case the OpenMPI message-passing system:

\`\`\`
alces gridware install mpi/openmpi --latest
\`\`\`
      `,

      matches: [{
        inputLine: 'alces gridware install mpi/openmpi --latest',
        anchored: true,
        regexp: false,
        nextStep: 'configureStorage',
      }],
    },

    configureStorage: {
      title: 'Configure your storage',
      description: `
Does it now say ‘Installation complete?’ Great!  Now that we have
installed our HPC software we need to obtain the challenge workload
that is stored in Amazon S3.

We’ll retrieve the challenge by using the “alces storage”
tool to configure access to object storage. To save time
we’ve created a shortcut to perform this configuration step:

\`\`\`
curl -L http://bit.ly/flight-challenge | bash -l
\`\`\`

\\* that last letter is a lowercase ‘L’. Aren’t fonts fun?
      `,

      matches: [{
        inputLine: 'curl -L http://bit.ly/flight-challenge | bash -l',
        anchored: true,
        regexp: false,
        nextStep: 'getWorkloadFiles',
      }, {
        inputLine: 'curl -L http://bit.ly/flight-challenge',
        anchored: true,
        regexp: false,
        nextStep: 'getWorkloadFiles',
      }],
    },

    getWorkloadFiles: {
      title: 'Get the workload files',
      description: `
When notified that the storage configuration ‘challenge’ is
now set as default you are ready to proceed.

The object storage configuration is in place we can go
ahead and get the workload files:

\`\`\`
alces storage get -R s3://alces-flight-challenge/challenge .
\`\`\`

\\* don’t forget the “.” on the end!
      `,

      matches: [{
        inputLine: 'alces storage get -R s3://alces-flight-challenge/challenge .',
        anchored: true,
        regexp: false,
        nextStep: 'prepareJob',
      }],
    },

    prepareJob: {
      title: 'Prepare your job',
      description: `
Once the workload files are retrieved it's time to prepare the
job for submission. You’ll know it’s time when the request to
retrieve files has stopped running and you can enter the next
command.

Create your job script with a challenge identifier (which will
be an anonymized string based on your email address):

\`\`\`
cd ~/challenge
bash -l configure-challenge.sh <your email address>
\`\`\`

\\* that pesky lowercase ‘L’ appears again! It‘s bash -l if you are
struggling.

The configuration script will compile an MPI program, create
a job script that can be submitted to the HPC job scheduler
and output your challenge identifier.
      `,

      matches: [{
        inputLine: 'bash -l configure-challenge.sh ',
        anchored: {
          start: true,
          end: false,
        },
        regexp: false,
        nextStep: 'submitJob',
      }],
    },

    submitJob: {
      title: 'Submit your job',
      description: `
We're ready to compute! Submit your job to the HPC job scheduler:

\`\`\`
sbatch challenge-mpi.sh 
\`\`\`
      `,

      matches: [{
        inputLine: 'sbatch challenge-mpi.sh',
        anchored: true,
        regexp: false,
        nextStep: 'checkProgress',
      }],
    },

    checkProgress: {
      title: 'Check the progress of your job',
      description: `
Your job is now being executed. You can check its progress by
running the queue monitoring command:

\`\`\`
squeue
\`\`\`

When your job completes you’ll get an email with results.
      `,

      matches: [],
    },
  },
}];

export default tutorials;
