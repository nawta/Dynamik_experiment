import { initJsPsych } from 'jspsych';
import { createApp } from 'vue'
import App from './App.vue'
import 'jspsych/css/jspsych.css';

// jsPsychプラグインのインポート
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'
import surveyHtmlForm from '@jspsych/plugin-survey-html-form'
import htmlButtonResponse from '@jspsych/plugin-html-button-response'
import audioKeyboardResponse from '@jspsych/plugin-audio-keyboard-response'
import surveyLikert from '@jspsych/plugin-survey-likert'
import videoKeyboardResponse from '@jspsych/plugin-video-keyboard-response'
import surveyMultiChoice from '@jspsych/plugin-survey-multi-choice'
import surveyText from '@jspsych/plugin-survey-text'
import preload from '@jspsych/plugin-preload'
import { jsPsychPipe } from '@jspsych-contrib/plugin-pipe'
import callFunction from '@jspsych/plugin-call-function'
// jsPsychSheetのインポート（必要な場合）
import jsPsychSheet from '@/scripts/jspsychsheet.js';
import '@/assets/jspsychsheet.css';

// console.log('main.js: Script started');

const app = createApp(App)

// console.log('main.js: Vue app created');

window.onerror = function (message, source, lineno, colno, error) {
    console.error('Global error:', message, 'at', source, lineno, colno);
    console.error('Error object:', error);
};

window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// 実験の初期化
const jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function () {
        // console.log('main.js: jsPsych experiment finished');
        jsPsych.data.displayData();
    }
});
// console.log('main.js: jsPsych initialized:', jsPsych);

// subject_idの設定
const urlParams = new URLSearchParams(window.location.search);
const subject_id = urlParams.get('PROLIFIC_PID') || jsPsych.randomization.randomID(10);
// console.log('main.js: Subject ID:', subject_id);

// グローバルプロパティとしてjsPsychとプラグインを追加
app.config.globalProperties.$subject_id = subject_id
app.config.globalProperties.$jsPsych = jsPsych
app.config.globalProperties.$jsPsychPlugins = {
    htmlKeyboardResponse,
    surveyHtmlForm,
    htmlButtonResponse,
    audioKeyboardResponse,
    surveyLikert,
    videoKeyboardResponse,
    surveyMultiChoice,
    surveyText,
    preload,
    jsPsychPipe,
    callFunction
}

// console.log('main.js: Mounting Vue app');
app.mount('#app')
// console.log('main.js: Vue app mounted');