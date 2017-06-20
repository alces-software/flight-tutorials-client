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
      title: 'Say hello',
      description: `
        <div>
          <p>You should type this:</p>
          <p><code>echo "Hello, world."</code></p>
          <p>I shall reward you with a pegamoose. I promise.</p>
        </div>
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
        inputLine: 'sinfo',
        anchored: true,
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
      matches: [],
    },
  },
}, {

  title: 'Click & Cloud Challenge',
  description: `
  <div>
    <p>
      You are about to use a HPC cluster to run a parallel program using a
      Message Passing Interface (MPI).  MPI is commonly used on compute
      clusters as a means by which a set of related processes can work
      together in parallel on one or more tasks.  In this environment the
      computers do not share any memory, so the only way to communicate data
      and other information is by passing messages between each other.
    </p>
    <p>
      In this challenge you will run a job script that anonymizes your email
      address and passes that information to an MPI program which, through a
      series of messages passed between compute nodes, will increase the
      letter or numerical value of your anonymized email address by three.
    </p>
    <p>
      After the process has completed you will receive an email containing
      your results.
    </p>
  </div>
  `,
  firstStep: 'installSoftware',

  steps: {
    installSoftware: {
      title: 'Install your software',
      description: `
      <div>
        <p>
          Once logged in, the first thing you'll need to do is install a piece
          of software from the Alces Gridware application library, in this
          case the OpenMPI message-passing system:
        </p>
        <code>
          alces gridware install mpi/openmpi --latest
        </code>
        <p>
          Does it now say ‘Installation complete?’ Great!  Now that we have
          installed our HPC software we need to obtain the challenge workload
          that is stored in Amazon S3
        </p>
      </div>
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
      <div>
        <p>
          Now we’ll retrieve the challenge by using the “alces storage”
          tool to configure access to object storage. To save time
          we’ve created a shortcut to perform this configuration step:
        </p>
        <code>
          curl -L http://bit.ly/flight-challenge | bash -l
        </code>
        <p>
          * that last letter is a lowercase ‘L’. Aren’t fonts fun?
        </p>
        <p>
          When notified that the storage configuration ‘challenge’ is
          now set as default you are ready to proceed
        </p>
      </div>
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
      <div>
        <p>
          Now the object storage configuration is in place we can go
          ahead and get the workload files:
        </p>
         <code>
           alces storage get -R s3://alces-flight-challenge/challenge .
         </code>
        <p>
          * don’t forget the “.” on the end!
        </p>
        <p>
          Once the workload files are retrieved it's time to prepare the
          job for submission. You’ll know it’s time when the request to
          retrieve files has stopped running and you can enter the next
          command.
        </p>
      </div>
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
      <div>
        <p>
          Create your job script with a challenge identifier (which will
          be an anonymized string based on your email address):
        </p>
         <code>
           cd ~/challenge
           bash -l configure-challenge.sh &lt;your email address>
         </code>
        <p>
          * that pesky lowercase ‘L’ appears again! It‘s bash -l if you are
          struggling.
        </p>
        <p>
          The configuration script will compile an MPI program, create
          a job script that can be submitted to the HPC job scheduler
          and output your challenge identifier
        </p>
      </div>
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
      <div>
        <p>
          We're ready to compute! Submit your job to the HPC job scheduler:
        </p>
        <code>
          sbatch challenge-mpi.sh 
        </code>
        <p>
          Your job is now being executed. You can check its progress by
          running the queue monitoring command:
        </p>
        <code>
          squeue
        </code>
        <p>
          When your job completes you’ll get an email with results.
        </p>
      </div>
      `,

      matches: [{
        inputLine: 'sbatch challenge-mpi.sh',
        anchored: true,
        regexp: false,
      }],
    },
  },
}];

export default tutorials;
