<template>
  <div id="jspsych-target"></div>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue'
import { loadQuestionData } from './scripts/questionData.js'
import { createExperiment } from './scripts/experiment.js'

export default {
  setup() {
    const instance = getCurrentInstance()
    
    onMounted(async () => {
      // console.log('App.vue: Component mounted');
      try {
        // console.log('App.vue: Loading question data');
        const questionData = await loadQuestionData()
        // console.log('App.vue: Question data loaded:', questionData);
        
        const { $jsPsych, $jsPsychPlugins, $subject_id } = instance.appContext.config.globalProperties
        // console.log('App.vue: Global properties:', { $jsPsych, $jsPsychPlugins, $subject_id });
        
        // console.log('App.vue: Creating experiment timeline');
        const timeline = createExperiment(questionData, $jsPsych, $jsPsychPlugins, $subject_id)
        // console.log('App.vue: Experiment timeline created:', timeline);
        
        // console.log('App.vue: Running jsPsych experiment');
        $jsPsych.run(timeline)
      } catch (error) {
        console.error("App.vue: Failed to load question data or run experiment:", error)
        document.body.innerHTML = `<h1>Error</h1><p>Failed to load experiment data. Please try again later.</p>`
      }
    })
  }
}
</script>