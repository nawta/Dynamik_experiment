// experiment.js

export function createExperiment(questionData, jsPsych, jsPsychPlugins, subject_id) {
  // console.log('experiment.js: Creating experiment');
  // console.log('experiment.js: questionData:', JSON.stringify(questionData, null, 2));

  // パラメータを取得
  const urlParams = getUrlParams();

  // URLからGETパラメータを取得する関数
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      PROLIFIC_PID: params.get('PROLIFIC_PID'),
      STUDY_ID: params.get('STUDY_ID'),
      SESSION_ID: params.get('SESSION_ID')
    };
  }
  // subject_idの設定
  // console.log('experiment.js: PROLIFIC_PID or Generated subject_id:', subject_id);

  // パラメータの有無をチェック
  const paramsPresent = {
    PROLIFIC_PID: !!urlParams.PROLIFIC_PID,
    STUDY_ID: !!urlParams.STUDY_ID,
    SESSION_ID: !!urlParams.SESSION_ID
  }

  const add_subject_id = {
    type: jsPsychCallFunction,
    func: function () {
      jsPsych.data.addProperties({
        subject_id: subject_id,
        PROLIFIC_PID: urlParams.PROLIFIC_PID,
        STUDY_ID: urlParams.STUDY_ID,
        SESSION_ID: urlParams.SESSION_ID,
        paramsPresent: paramsPresent
      });
      // console.log('subject_id:', jsPsych.data.get().select('subject_id').values);
      // console.log('PROLIFIC_PID:', jsPsych.data.get().select('PROLIFIC_PID').values);
      // console.log('STUDY_ID:', jsPsych.data.get().select('STUDY_ID').values);
      // console.log('SESSION_ID:', jsPsych.data.get().select('SESSION_ID').values);
      // console.log('paramsPresent:', jsPsych.data.get().select('paramsPresent').values);
    }
  };

  // ユーティリティ関数: 配列からランダムに要素を選択
  function getRandomElements(arr, n) {
    let shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  // ユーティリティ関数: 配列をシャッフル
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // CNN動画の選択と条件のランダム化
  function selectAndRandomizeCNNVideos(questionData) {
    // 1~20の番号から6つをランダムに選択(実験時は1, 3, 4, 6, 8, 9)
    const selectedNumbers = shuffleArray([1, 3, 4, 6, 8, 9]); //getRandomElements([...Array(20)].map((_, i) => i + 1), 6);

    // 条件をランダムに並べ替え（2セット分）
    const randomizedConditions = shuffleArray([...questionData.cnn_videos.conditions, ...questionData.cnn_videos.conditions]);

    // 選択された動画と条件を組み合わせる
    return selectedNumbers.map((number, index) => {
      const condition = randomizedConditions[index];
      const videoData = questionData.cnn_videos.videos.find(v => v.number === number);
      return {
        video: `./video/${condition}/CNN${number}_${condition}.mp4`,
        questions: videoData.questions,
        condition: condition,
        number: number
      };
    });
  }
 
  // 実験の各パートを定義
  const welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<h1>Welcome to the Listening Comprehension with Modified Subtitles Experiment</h1><p>Press the spacebar to begin.</p>"
  };

  const demographic_survey = {
    type: jsPsychSurveyHtmlForm,
    preamble: "<p>Please answer the following questions:</p>",
    html: `
          <label for="gender">Gender:</label>
          <select id="gender" name="gender" required>
              <option value="">Select</option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="non-binary">Non-binary</option>
          </select>
          <br><br>
          <label for="age">Age:</label>
          <input type="number" id="age" name="age" min="10" max="100" required>
          <br><br>
          <label for="nationality">Nationality:</label>
          <select id="nationality" name="nationality" required>
                <option value="">Select</option>
                <option value="Afganistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bonaire">Bonaire</option>
                <option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Canary Islands">Canary Islands</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Channel Islands">Channel Islands</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos Island">Cocos Island</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote DIvoire">Cote D'Ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Curaco">Curacao</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="East Timor">East Timor</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands">Falkland Islands</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Ter">French Southern Ter</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Great Britain">Great Britain</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea North">Korea North</option>
                <option value="Korea Sout">Korea South</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macau">Macau</option>
                <option value="Macedonia">Macedonia</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Malawi">Malawi</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Midway Islands">Midway Islands</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Nambia">Nambia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherland Antilles">Netherland Antilles</option>
                <option value="Netherlands">Netherlands (Holland, Europe)</option>
                <option value="Nevis">Nevis</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau Island">Palau Island</option>
                <option value="Palestine">Palestine</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Phillipines">Philippines</option>
                <option value="Pitcairn Island">Pitcairn Island</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Republic of Montenegro">Republic of Montenegro</option>
                <option value="Republic of Serbia">Republic of Serbia</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="St Barthelemy">St Barthelemy</option>
                <option value="St Eustatius">St Eustatius</option>
                <option value="St Helena">St Helena</option>
                <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                <option value="St Lucia">St Lucia</option>
                <option value="St Maarten">St Maarten</option>
                <option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>
                <option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>
                <option value="Saipan">Saipan</option>
                <option value="Samoa">Samoa</option>
                <option value="Samoa American">Samoa American</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Tahiti">Tahiti</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Erimates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States of America">United States of America</option>
                <option value="Uraguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Vatican City State">Vatican City State</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                <option value="Wake Island">Wake Island</option>
                <option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>
                <option value="Yemen">Yemen</option>
                <option value="Zaire">Zaire</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
          </select>
          <br><br>
          <label for="native_language">Native Language:</label>
          <select id="native_language" name="native_language" required>
                <option value="">Select</option>
                <option value="English">English</option>
                <option value="Afrikaans">Afrikaans</option>
                <option value="Albanian">Albanian</option>
                <option value="Arabic">Arabic</option>
                <option value="Armenian">Armenian</option>
                <option value="Basque">Basque</option>
                <option value="Bengali">Bengali</option>
                <option value="Bulgarian">Bulgarian</option>
                <option value="Catalan">Catalan</option>
                <option value="Cambodian">Cambodian</option>
                <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                <option value="Croatian">Croatian</option>
                <option value="Czech">Czech</option>
                <option value="Danish">Danish</option>
                <option value="Dutch">Dutch</option>
                <option value="Estonian">Estonian</option>
                <option value="Fiji">Fiji</option>
                <option value="Finnish">Finnish</option>
                <option value="French">French</option>
                <option value="Georgian">Georgian</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Hindi">Hindi</option>
                <option value="Hungarian">Hungarian</option>
                <option value="Icelandic">Icelandic</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Javanese">Javanese</option>
                <option value="Korean">Korean</option>
                <option value="Latin">Latin</option>
                <option value="Latvian">Latvian</option>
                <option value="Lithuanian">Lithuanian</option>
                <option value="Macedonian">Macedonian</option>
                <option value="Malay">Malay</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Maltese">Maltese</option>
                <option value="Maori">Maori</option>
                <option value="Marathi">Marathi</option>
                <option value="Mongolian">Mongolian</option>
                <option value="Nepali">Nepali</option>
                <option value="Norwegian">Norwegian</option>
                <option value="Persian">Persian</option>
                <option value="Polish">Polish</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Quechua">Quechua</option>
                <option value="Romanian">Romanian</option>
                <option value="Russian">Russian</option>
                <option value="Samoan">Samoan</option>
                <option value="Serbian">Serbian</option>
                <option value="Slovak">Slovak</option>
                <option value="Slovenian">Slovenian</option>
                <option value="Spanish">Spanish</option>
                <option value="Swahili">Swahili</option>
                <option value="Swedish ">Swedish </option>
                <option value="Tamil">Tamil</option>
                <option value="Tatar">Tatar</option>
                <option value="Telugu">Telugu</option>
                <option value="Thai">Thai</option>
                <option value="Tibetan">Tibetan</option>
                <option value="Tonga">Tonga</option>
                <option value="Turkish">Turkish</option>
                <option value="Ukrainian">Ukrainian</option>
                <option value="Urdu">Urdu</option>
                <option value="Uzbek">Uzbek</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Welsh">Welsh</option>
                <option value="Xhosa">Xhosa</option>
          </select>
          <br><br>
          <label>Other Languages Spoken (Optional):</label><br>
          <div>
            <label for="other_language1">Other Language 1:</label>
            <select id="other_language1" name="other_language1">
              <option value="">Select</option>
                <option value="English">English</option>
                <option value="Afrikaans">Afrikaans</option>
                <option value="Albanian">Albanian</option>
                <option value="Arabic">Arabic</option>
                <option value="Armenian">Armenian</option>
                <option value="Basque">Basque</option>
                <option value="Bengali">Bengali</option>
                <option value="Bulgarian">Bulgarian</option>
                <option value="Catalan">Catalan</option>
                <option value="Cambodian">Cambodian</option>
                <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                <option value="Croatian">Croatian</option>
                <option value="Czech">Czech</option>
                <option value="Danish">Danish</option>
                <option value="Dutch">Dutch</option>
                <option value="Estonian">Estonian</option>
                <option value="Fiji">Fiji</option>
                <option value="Finnish">Finnish</option>
                <option value="French">French</option>
                <option value="Georgian">Georgian</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Hindi">Hindi</option>
                <option value="Hungarian">Hungarian</option>
                <option value="Icelandic">Icelandic</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Javanese">Javanese</option>
                <option value="Korean">Korean</option>
                <option value="Latin">Latin</option>
                <option value="Latvian">Latvian</option>
                <option value="Lithuanian">Lithuanian</option>
                <option value="Macedonian">Macedonian</option>
                <option value="Malay">Malay</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Maltese">Maltese</option>
                <option value="Maori">Maori</option>
                <option value="Marathi">Marathi</option>
                <option value="Mongolian">Mongolian</option>
                <option value="Nepali">Nepali</option>
                <option value="Norwegian">Norwegian</option>
                <option value="Persian">Persian</option>
                <option value="Polish">Polish</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Quechua">Quechua</option>
                <option value="Romanian">Romanian</option>
                <option value="Russian">Russian</option>
                <option value="Samoan">Samoan</option>
                <option value="Serbian">Serbian</option>
                <option value="Slovak">Slovak</option>
                <option value="Slovenian">Slovenian</option>
                <option value="Spanish">Spanish</option>
                <option value="Swahili">Swahili</option>
                <option value="Swedish ">Swedish </option>
                <option value="Tamil">Tamil</option>
                <option value="Tatar">Tatar</option>
                <option value="Telugu">Telugu</option>
                <option value="Thai">Thai</option>
                <option value="Tibetan">Tibetan</option>
                <option value="Tonga">Tonga</option>
                <option value="Turkish">Turkish</option>
                <option value="Ukrainian">Ukrainian</option>
                <option value="Urdu">Urdu</option>
                <option value="Uzbek">Uzbek</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Welsh">Welsh</option>
                      <option value="Xhosa">Xhosa</option>
            </select>
          </div>
          <div>
            <label for="other_language2">Other Language 2:</label>
            <select id="other_language2" name="other_language2">
              <option value="">Select</option>
                <option value="English">English</option>
                <option value="Afrikaans">Afrikaans</option>
                <option value="Albanian">Albanian</option>
                <option value="Arabic">Arabic</option>
                <option value="Armenian">Armenian</option>
                <option value="Basque">Basque</option>
                <option value="Bengali">Bengali</option>
                <option value="Bulgarian">Bulgarian</option>
                <option value="Catalan">Catalan</option>
                <option value="Cambodian">Cambodian</option>
                <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                <option value="Croatian">Croatian</option>
                <option value="Czech">Czech</option>
                <option value="Danish">Danish</option>
                <option value="Dutch">Dutch</option>
                <option value="Estonian">Estonian</option>
                <option value="Fiji">Fiji</option>
                <option value="Finnish">Finnish</option>
                <option value="French">French</option>
                <option value="Georgian">Georgian</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Hindi">Hindi</option>
                <option value="Hungarian">Hungarian</option>
                <option value="Icelandic">Icelandic</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Javanese">Javanese</option>
                <option value="Korean">Korean</option>
                <option value="Latin">Latin</option>
                <option value="Latvian">Latvian</option>
                <option value="Lithuanian">Lithuanian</option>
                <option value="Macedonian">Macedonian</option>
                <option value="Malay">Malay</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Maltese">Maltese</option>
                <option value="Maori">Maori</option>
                <option value="Marathi">Marathi</option>
                <option value="Mongolian">Mongolian</option>
                <option value="Nepali">Nepali</option>
                <option value="Norwegian">Norwegian</option>
                <option value="Persian">Persian</option>
                <option value="Polish">Polish</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Quechua">Quechua</option>
                <option value="Romanian">Romanian</option>
                <option value="Russian">Russian</option>
                <option value="Samoan">Samoan</option>
                <option value="Serbian">Serbian</option>
                <option value="Slovak">Slovak</option>
                <option value="Slovenian">Slovenian</option>
                <option value="Spanish">Spanish</option>
                <option value="Swahili">Swahili</option>
                <option value="Swedish ">Swedish </option>
                <option value="Tamil">Tamil</option>
                <option value="Tatar">Tatar</option>
                <option value="Telugu">Telugu</option>
                <option value="Thai">Thai</option>
                <option value="Tibetan">Tibetan</option>
                <option value="Tonga">Tonga</option>
                <option value="Turkish">Turkish</option>
                <option value="Ukrainian">Ukrainian</option>
                <option value="Urdu">Urdu</option>
                <option value="Uzbek">Uzbek</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Welsh">Welsh</option>
                <option value="Xhosa">Xhosa</option>
            </select>
          </div>
          <div>
            <label for="other_language3">Other Language 3:</label>
            <select id="other_language3" name="other_language3">
              <option value="">Select</option>
                <option value="English">English</option>
                <option value="Afrikaans">Afrikaans</option>
                <option value="Albanian">Albanian</option>
                <option value="Arabic">Arabic</option>
                <option value="Armenian">Armenian</option>
                <option value="Basque">Basque</option>
                <option value="Bengali">Bengali</option>
                <option value="Bulgarian">Bulgarian</option>
                <option value="Catalan">Catalan</option>
                <option value="Cambodian">Cambodian</option>
                <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                <option value="Croatian">Croatian</option>
                <option value="Czech">Czech</option>
                <option value="Danish">Danish</option>
                <option value="Dutch">Dutch</option>
                <option value="Estonian">Estonian</option>
                <option value="Fiji">Fiji</option>
                <option value="Finnish">Finnish</option>
                <option value="French">French</option>
                <option value="Georgian">Georgian</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Hindi">Hindi</option>
                <option value="Hungarian">Hungarian</option>
                <option value="Icelandic">Icelandic</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Javanese">Javanese</option>
                <option value="Korean">Korean</option>
                <option value="Latin">Latin</option>
                <option value="Latvian">Latvian</option>
                <option value="Lithuanian">Lithuanian</option>
                <option value="Macedonian">Macedonian</option>
                <option value="Malay">Malay</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Maltese">Maltese</option>
                <option value="Maori">Maori</option>
                <option value="Marathi">Marathi</option>
                <option value="Mongolian">Mongolian</option>
                <option value="Nepali">Nepali</option>
                <option value="Norwegian">Norwegian</option>
                <option value="Persian">Persian</option>
                <option value="Polish">Polish</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Quechua">Quechua</option>
                <option value="Romanian">Romanian</option>
                <option value="Russian">Russian</option>
                <option value="Samoan">Samoan</option>
                <option value="Serbian">Serbian</option>
                <option value="Slovak">Slovak</option>
                <option value="Slovenian">Slovenian</option>
                <option value="Spanish">Spanish</option>
                <option value="Swahili">Swahili</option>
                <option value="Swedish ">Swedish </option>
                <option value="Tamil">Tamil</option>
                <option value="Tatar">Tatar</option>
                <option value="Telugu">Telugu</option>
                <option value="Thai">Thai</option>
                <option value="Tibetan">Tibetan</option>
                <option value="Tonga">Tonga</option>
                <option value="Turkish">Turkish</option>
                <option value="Ukrainian">Ukrainian</option>
                <option value="Urdu">Urdu</option>
                <option value="Uzbek">Uzbek</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Welsh">Welsh</option>
                <option value="Xhosa">Xhosa</option>
          </select>
        </div>

            <!-- 英語能力テストのセクション -->
        <label>English Proficiency Test Scores (Optional):</label><br>
        <div>
          <label for="toefl_score">TOEFL Score:</label>
          <input type="number" id="toefl_score" name="toefl_score" min="0" max="120">
        </div>
        <div>
          <label for="toeic_score">TOEIC Score:</label>
          <input type="number" id="toeic_score" name="toeic_score" min="0" max="990" step="5">
        </div>
        <div>
          <label for="ielts_score">IELTS Score:</label>
          <input type="number" id="ielts_score" name="ielts_score" min="0" max="9" step="0.5">
        </div>
      `,
    button_label: "Next",
    data: {
      task: 'demographic_survey'
    },
    on_load: function () {
      document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function () {
          // 小数点以下1桁まで許可（IELTS用）
          this.value = this.value.replace(/[^0-9.]/g, '');
          if (this.value.split('.')[1]?.length > 1) {
            this.value = parseFloat(this.value).toFixed(1);
          }
        });
      });
    }
  };

  //実験同意画面
  const consent_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <h2>Consent Form</h2>
      <p><strong>The aim of this survey:</strong></p>
      <p>We are conducting a survey to determine the most appropriate form of subtitles to assist with English listening comprehension.</p>
      <p>The survey consists of one TOEFL listening section and six 1-min listening sections from televisions with some questions, and takes approximately 15 minutes to complete. There are no specific eligibility requirements.</p>
      <p>The reward is 3.3 GBP or 3.6 GBP (10.00 GBP/h or 11.00 GBP/h), depending on your correct answer rate for comprehension quizzes in this survey.</p>
      <p>We are also asking good scorers with productive comments for further 30 min - 1h online interview sessions (with rewards) in the near future.</p>
      <p>We would be grateful for your cooperation with the survey.</p>
      <p><strong>Contact:</strong></p>
      <p>If you have any questions, comments, or requests regarding this survey, please contact:</p>
      <p>Naoto Nishida<br>
      Doctoral Student, Graduate School of Interdisciplinary Information Studies, The University of Tokyo<br>
      Email: nawta@g.ecc.u-tokyo.ac.jp</p>
      <p>Please indicate whether you agree to participate in this study.</p>
    `,
    choices: ['I agree', 'I do not agree'],
    data: {
      task: 'consent'
    },
    on_finish: function (data) {
      if (data.response == 1) {
        jsPsych.endExperiment('Thank you for your time. The completion code is CLIBK86T.');
      }
    }
  };

  //Likert尺度の視覚的補助用の
  const coloredLikertCSS = `
    <style>
      .jspsych-survey-likert-statement {
        margin-bottom: 1em;
        text-align: center;
      }
      .jspsych-survey-likert-opts {
        display: flex;
        justify-content: center;
        align-items: stretch;
        margin: 0 auto;
        width: 100%;
        max-width: 800px;
      }
      .jspsych-survey-likert-opt-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: 10px 5px;
        border-radius: 5px;
        transition: background-color 0.3s;
        color: black;
        cursor: pointer;
        margin: 0 2px;
        text-align: center;
        min-width: 80px; /* 最小幅を設定 */
      }
      .jspsych-survey-likert-opt-label input[type='radio'] {
        margin-top: 5px;
      }
      .jspsych-survey-likert-opt-label:hover {
        filter: brightness(90%);
      }
      .bg-very-low { background-color: rgba(26, 152, 80, 0.3); }
      .bg-low { background-color: rgba(145, 207, 96, 0.3); }
      .bg-slightly-low { background-color: rgba(217, 239, 139, 0.3); }
      .bg-neutral { background-color: rgba(255, 255, 191, 0.3); }
      .bg-slightly-high { background-color: rgba(254, 224, 139, 0.3); }
      .bg-high { background-color: rgba(252, 141, 89, 0.3); }
      .bg-very-high { background-color: rgba(215, 48, 39, 0.3); }
    </style>
    `;

  const nasaTLXCSS = `
    <style>

      /* 擬似要素を無効化 */
      .jspsych-survey-likert-opts::before,
      .nasa-tlx-opts::before {
        content: none !important;
        display: none !important;
      }
      
      .nasa-tlx-container {
        max-width: 800px;
        margin: 0 auto;
      }
      .nasa-tlx-question {
        text-align: center;
        margin-bottom: 1em;
      }
      .nasa-tlx-opts {
        display: flex;
        justify-content: center;
        align-items: stretch;
        margin: 0 auto;
        width: 100%;
      }
      .nasa-tlx-opt-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: 10px 5px;
        border-radius: 5px;
        transition: background-color 0.3s;
        color: black;
        cursor: pointer;
        margin: 0 2px;
        text-align: center;
        min-width: 80px;
      }
      .nasa-tlx-opt-label input[type='radio'] {
        margin-top: 5px;
      }
    </style>
    `;

  const applyColorToLikertScale = () => {
    document.querySelectorAll('.jspsych-survey-likert-statement, .nasa-tlx-question').forEach((statement) => {
      const opts = statement.nextElementSibling;
      opts.querySelectorAll('.jspsych-survey-likert-opt-label, .nasa-tlx-opt-label').forEach((label, index) => {
        const colors = ['very-low', 'low', 'slightly-low', 'neutral', 'slightly-high', 'high', 'very-high'];
        label.classList.add(`bg-${colors[index]}`);

        // ラベル全体をクリック可能にする
        label.addEventListener('click', (e) => {
          if (e.target !== label.querySelector('input')) {
            label.querySelector('input').click();
          }
        });
      });
    });
  };


  // TOEFLリスニング準備画面
  const toefl_preparation = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<h2>TOEFL Listening Question</h2><p>Here, you will now listen to a TOEFL Listening Section with 4-min audio. <strong>You can take notes.</strong><br>Are you ready?<br>Press the 'Start' button when you are ready to begin.</p>",
    choices: ['Start'],
    data: {
      task: 'toefl_preparation'
    }
  };

  // TOEFLリスニング問題
  const toefl_listening = {
    timeline: [
      {
        type: jsPsychAudioKeyboardResponse,
        stimulus: '/jspsych_vue_test/audio/toefl_audio.mp3', //questionData.toefl.audio
        choices: "NO_KEYS",
        trial_ends_after_audio: true,
        prompt: function () {
          return `
            <div style="display: flex; flex-direction: column; align-items: center;">
              <img src="/jspsych_vue_test/image/toefl_image.jpg" alt="TOEFL Listening Image" style="max-width: 80%; height: auto; margin-bottom: 20px;">
              <p>Listen carefully to the audio. Questions will be displayed after it ends.</p>
            </div>
          `;
        }, 
        data: {
          task: 'toefl_listening_audio'
        }
      },
      {
        type: jsPsychHtmlButtonResponse,
        stimulus: function () {
          let questionsHtml = '';
          questionData.toefl.questions.forEach((q, index) => {
            const shuffledOptions = shuffleArray([...q.options]);
            questionsHtml += `<div class="question">
            <p>${index + 1}. ${q.prompt}</p>
            <div class="options" id="options_${index}">
              ${shuffledOptions.map(option => `
                <button class="option-button" data-question="${index}" data-option="${option}">${option}</button>
              `).join('')}
            </div>
            ${q.multiple ? '<p>(You can select multiple options)</p>' : ''}
          </div>`;
          });
          return questionsHtml;
        },
        choices: ['Submit'],
        button_html: '<button class="jspsych-btn">%choice%</button>',
        on_load: function () {
          this.selections = questionData.toefl.questions.map(() => []);
          document.querySelectorAll('.option-button').forEach(button => {
            button.addEventListener('click', (event) => {
              const questionIndex = parseInt(event.target.getAttribute('data-question'));
              const option = event.target.getAttribute('data-option');
              const isMultiple = questionData.toefl.questions[questionIndex].multiple;

              if (isMultiple) {
                const index = this.selections[questionIndex].indexOf(option);
                if (index > -1) {
                  this.selections[questionIndex].splice(index, 1);
                  event.target.classList.remove('selected');
                } else {
                  this.selections[questionIndex].push(option);
                  event.target.classList.add('selected');
                }
              } else {
                document.querySelectorAll(`#options_${questionIndex} .option-button`).forEach(btn => {
                  btn.classList.remove('selected');
                });
                this.selections[questionIndex] = [option];
                event.target.classList.add('selected');
              }

              // 全ての質問に回答されているかチェック
              const allAnswered = this.selections.every(selection => selection.length > 0);
              document.querySelector('.jspsych-btn').disabled = !allAnswered;
            });
          });

          // Submit ボタンを初期状態で無効化
          document.querySelector('.jspsych-btn').disabled = true;
        },
        on_finish: function (data) {
          // console.log('Raw data:', data); // デバッグ用

          if (!this.selections || this.selections.length === 0) {
            console.error('No responses recorded');
            data.correct = false;
            data.num_correct = 0;
            return;
          }

          data.user_selections = this.selections;
          // console.log('User selections:', data.user_selections); // デバッグ用

          data.correct = questionData.toefl.questions.every((q, index) => {
            if (!data.user_selections[index] || data.user_selections[index].length === 0) {
              console.warn(`No response for question ${index + 1}`);
              return false;
            }
            if (q.multiple) {
              return JSON.stringify(data.user_selections[index].sort()) === JSON.stringify(q.correct_answer.sort());
            } else {
              return data.user_selections[index][0] === q.correct_answer;
            }
          });

          data.num_correct = questionData.toefl.questions.filter((q, index) => {
            if (!data.user_selections[index] || data.user_selections[index].length === 0) {
              return false;
            }
            if (q.multiple) {
              return JSON.stringify(data.user_selections[index].sort()) === JSON.stringify(q.correct_answer.sort());
            } else {
              return data.user_selections[index][0] === q.correct_answer;
            }
          }).length;

          // console.log('Processed data:', data); // デバッグ用
        }
      }
    ]
  };

  // NASA-TLXに入れるダミー質問
  function generateDummyQuestionForNASATLX() {
    return {
      prompt: "For this question, please select 'Slightly Low'.",
      name: 'dummy',
      labels: ["Very Low", "Low", "Slightly Low", "Neutral", "Slightly High", "High", "Very High"],
      required: true
    };
  }

  // NASA-TLX質問の定義
  const createNasaTLX = () => {
    const generateQuestions = () => {
      // console.log('Generating NASA-TLX questions');
      let questions = [
        {
          prompt: "Mental Demand: How much mental and perceptual activity was required?",
          name: 'mental_demand',
          labels: ["Very Low", "Low", "Slightly Low", "Neutral", "Slightly High", "High", "Very High"],
          required: true
        },
        {
          prompt: "Physical Demand: How much physical activity was required?",
          name: 'physical_demand',
          labels: ["Very Low", "Low", "Slightly Low", "Neutral", "Slightly High", "High", "Very High"],
          required: true
        },
        {
          prompt: "Temporal Demand: How much time pressure did you feel due to the pace at which the tasks or task elements occurred?",
          name: 'temporal_demand',
          labels: ["Very Low", "Low", "Slightly Low", "Neutral", "Slightly High", "High", "Very High"],
          required: true
        },
        {
          prompt: "Performance: How successful do you think you were in accomplishing the goals of the task set by the experimenter (or yourself)?",
          name: 'performance',
          labels: ["Perfect", "Good", "Slightly Good", "Neutral", "Slightly Bad", "Bad", "Failure"],
          required: true
        },
        {
          prompt: "Effort: How hard did you have to work to accomplish your level of performance?",
          name: 'effort',
          labels: ["Very Low", "Low", "Slightly Low", "Neutral", "Slightly High", "High", "Very High"],
          required: true
        },
        {
          prompt: "Frustration: How insecure, discouraged, irritated, stressed, and annoyed were you?",
          name: 'frustration',
          labels: ["Very Low", "Low", "Slightly Low", "Neutral", "Slightly High", "High", "Very High"],
          required: true
        }
      ];

      // 40%の確率でダミー質問を追加
      if (Math.random() < 0.4) {
        questions.splice(Math.floor(Math.random() * questions.length), 0, generateDummyQuestionForNASATLX());
      }

      // console.log('Generated NASA-TLX questions:', questions);
      return questions;
    };

    const questions = generateQuestions();

    return {
      type: jsPsychSurveyLikert,
      preamble: coloredLikertCSS + nasaTLXCSS + "<p>Please rate the workload you experienced <strong>while listening to the audio and reading the subtitles:</strong></p>",
      questions: questions,
      data: function () {
        // console.log('Executing data function for NASA-TLX');
        return {
          task: 'nasa_tlx',
          has_dummy: questions.some(q => q && q.name === 'dummy')
        };
      },
      on_finish: function (data) {
        if (data.has_dummy) {
          const dummyQuestion = questions.find(q => q.name === 'dummy');
          if (dummyQuestion) {
            const correctIndex = dummyQuestion.labels.indexOf('Slightly Low');
            data.dummy_correct = data.response.dummy === correctIndex;
          } else {
            console.error('Dummy question not found in NASA-TLX');
          }
        }
      },
      button_label: 'Continue',
      on_load: function () {
        // console.log('Loading NASA-TLX questions');

        setTimeout(() => {
          // ラベルに色を適用
          applyColorToLikertScale();
          // NASA-TLX特有のスタイル適用
          document.querySelectorAll('.jspsych-survey-likert-statement').forEach(statement => {
            statement.classList.add('nasa-tlx-question');
          });
          document.querySelectorAll('.jspsych-survey-likert-opts').forEach(opts => {
            opts.classList.add('nasa-tlx-opts');
          });
          document.querySelectorAll('.jspsych-survey-likert-opt-label').forEach(label => {
            label.classList.add('nasa-tlx-opt-label');
          });

          const continueButton = document.querySelector('button[form="jspsych-survey-likert-form"]');
          if (continueButton) {
            continueButton.disabled = true;

            document.querySelectorAll('input[type="radio"]').forEach(input => {
              input.addEventListener('change', checkAllAnswered);
            });

            function checkAllAnswered() {
              const allAnswered = Array.from(document.querySelectorAll('.jspsych-survey-likert-question')).every(question =>
                question.querySelector('input:checked')
              );
              continueButton.disabled = !allAnswered;
            }
          }
        }, 0);
      }
    };
  };
  // 使用時
  const nasa_tlx = createNasaTLX();



  // ビデオ視聴に関する集中度合いとか聞く質問に入れるダミー質問
  function generateDummyQuestionForWorkloadQuestionnaire() {
    return {
      prompt: "For this question, please select 'Barely'.",
      name: 'dummy',
      labels: ["Completely", "Mostly", "Somewhat", "Neutral", "Slightly", "Barely", "Not at all"],
      required: true
    }
  }

  // 動画に関する質問の定義
  const createVideoQuestions = () => {
      const generateQuestions = () => {
        // console.log('Generating video questions');  // デバッグ用
        let questions = [
          {
            prompt: "How well did you understand the content of the video?",
            name: 'comprehension',
            labels: ["Completely", "Mostly", "Somewhat", "Neutral", "Slightly", "Barely", "Not at all"],
            required: true
          },
          {
            prompt: "How engaged were you with the video?",
            name: 'engagement',
            labels: ["Completely", "Mostly", "Somewhat", "Neutral", "Slightly", "Barely", "Not at all"],
            required: true
          },
          {
            prompt: "How would you rate the readability of the video content?",
            name: 'readability',
            labels: ["Perfect", "Good", "Slightly Good", "Neutral", "Slightly Bad", "Bad", "Failure"],
            required: true
          }
        ];
        // 40%の確率でダミー質問を追加
        if (Math.random() < 0.4) {
          questions.splice(Math.floor(Math.random() * questions.length), 0, generateDummyQuestionForWorkloadQuestionnaire());
        }

        // console.log('Generated questions:', questions);
        return questions;
      };


      const questions = generateQuestions();

      return {
        type: jsPsychSurveyLikert,
        questions: questions,
        preamble: coloredLikertCSS,
        data: function () {
          // console.log('Executing data function for video_questions');
          return {
            task: 'video_questions',
            has_dummy: questions.some(q => q && q.name === 'dummy')
          };
        },
        on_finish: function (data) {
          if (data.has_dummy) {
            const dummyQuestion = questions.find(q => q.name === 'dummy');
            if (dummyQuestion) {
              const correctIndex = dummyQuestion.labels.indexOf('Barely');
              data.dummy_correct = data.response.dummy === correctIndex;
            } else {
              console.error('Dummy question not found in video questions');
            }
          }
        },
      button_label: 'Continue',
      on_load: function () {
        // console.log('Loading video_questions');  // デバッグ用
        setTimeout(() => {

          // ラベルに色を適用
          applyColorToLikertScale();

          const continueButton = document.querySelector('button[form="jspsych-survey-likert-form"]');
          if (continueButton) {
            continueButton.disabled = true;

            document.querySelectorAll('input[type="radio"]').forEach(input => {
              input.addEventListener('change', checkAllAnswered);
            });

            function checkAllAnswered() {
              const allAnswered = Array.from(document.querySelectorAll('.jspsych-survey-likert-question')).every(question =>
                question.querySelector('input:checked')
              );
              continueButton.disabled = !allAnswered;
            }
          }
        }, 0);
      }
    };
  }
  const video_questions = createVideoQuestions();




  // 実験の開始
  // instruction
  const video_trial_instruction = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p>You will now listen to 6 news audio clips with speech-recognized subtitles. Each clip has 1 min audio. After each clip, you will take a comprehension test <strong>extracted from important key phrases in the passages</strong>, 
    followed by a survey about the readability of the subtitles, your subjective understanding, engagement level, 
    and workload when using the subtitles.</p>
    <p>There are three types of subtitles: regular subtitles (normal), those that extract keywords only (keyword), and those that emphasize important keywords (dynamik, originated in a terminology for music). Please note that there may be some misrecognition in the subtitles.</p>
    <p><strong>You cannot take notes in this section.</strong></p>
    <p>In the following trials, please pay attention to the differences between the three conditions (Normal, Keyword, Dynamik):</p>
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 20px;">
      <div style="margin-bottom: 20px;">
        <img src="/jspsych_vue_test/image/normal.jpg" alt="Normal condition" style="width: 100%; max-width: 600px; height: auto;">
        <p style="color: red; font-weight: bold; text-align: center; margin-top: 10px;">Normal</p>
      </div>
      <div style="margin-bottom: 20px;">
        <img src="/jspsych_vue_test/image/keyword.jpg" alt="Keyword condition" style="width: 100%; max-width: 600px; height: auto;">
        <p style="color: blue; font-weight: bold; text-align: center; margin-top: 10px;">Keyword</p>
      </div>
      <div>
        <img src="/jspsych_vue_test/image/dynamik.jpg" alt="Dynamik condition" style="width: 100%; max-width: 600px; height: auto;">
        <p style="color: green; font-weight: bold; text-align: center; margin-top: 10px;">Dynamik</p>
      </div>
    </div>
    <p>Press the Start button when you are ready.</p>
  `,
    choices: ['Start']
  };

  // CNN動画の選択とランダム化
  const selected_videos = selectAndRandomizeCNNVideos(questionData);
  // console.log('Selected videos:', selected_videos);  // デバッグ用

  // CNN動画とそれに関連する質問のタイムライン
  const video_trial = {
    timeline: [
      {
        type: jsPsychVideoKeyboardResponse,
        stimulus: function () {
          // console.log('Video stimulus:', jsPsych.timelineVariable('video'));  // デバッグ用
          return [jsPsych.timelineVariable('video')];
        },
        choices: "NO_KEYS",
        trial_ends_after_video: true,
        prompt: function () {
          const condition = jsPsych.timelineVariable('condition');
          let color;
          switch (condition) {
            case 'normal':
              color = 'red';
              break;
            case 'keyword':
              color = 'blue';
              break;
            case 'dynamik':
              color = 'green';
              break;
            default:
              color = 'black';
          }
          return `
          <div style="position: relative; width: 100%; height: 40px;">
            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); background-color: rgba(255,255,255,0.7); padding: 5px; z-index: 1000;">
              <p style="margin: 0; color: ${color}; font-weight: bold;">Condition: ${condition}</p>
            </div>
          </div>
          <div style="position: relative;">
            <video id="jspsych-video-keyboard-response-stimulus" style="display: block; margin: 0 auto;">
              <!-- video content -->
            </video>
            <div style="position: absolute; bottom: 40px; left: 0; right: 0; text-align: center;">
              <p style="background-color: rgba(0,0,0,0.7); color: white; padding: 5px; margin: 0; font-size: 16px;">Please watch the video carefully. Questions will appear after the end.</p>
            </div>
          </div>
        `;
        }, 
        data: function () {
          return {
            task: 'cnn_video',
            condition: jsPsych.timelineVariable('condition'),
            video_number: jsPsych.timelineVariable('number')
          };
        }
      },
      video_questions,
      {
        type: jsPsychSurveyMultiChoice,
        questions: function () {
          return jsPsych.timelineVariable('questions').map(q => ({
            ...q,
            options: shuffleArray([...q.options])
          }));
        },
        data: function () {
          // console.log('Multiple choice questions:', jsPsych.timelineVariable('questions'));
          return {
            task: 'cnn_video_questions',
            condition: jsPsych.timelineVariable('condition'),
            video_number: jsPsych.timelineVariable('number'),
            correct_answers: jsPsych.timelineVariable('questions').map(q => q.correct_answer)
          };
        },
        button_label: 'Continue',
        on_load: function () {
          setTimeout(() => {
            const continueButton = document.querySelector('#jspsych-survey-multi-choice-next');
            if (continueButton) {
              continueButton.disabled = true;

              document.querySelectorAll('input[type="radio"]').forEach(input => {
                input.addEventListener('change', checkAllAnswered);
              });

              function checkAllAnswered() {
                const allAnswered = Array.from(document.querySelectorAll('.jspsych-survey-multi-choice-question')).every(question =>
                  question.querySelector('input:checked')
                );
                continueButton.disabled = !allAnswered;
              }
            }
          }, 0);
        },
        on_finish: function (data) {
          const responses = Object.values(data.response);
          const correct_answers = data.correct_answers;

          data.correct = responses.every((response, index) =>
            response === correct_answers[index]
          );
          data.num_correct = responses.filter((response, index) =>
            response === correct_answers[index]
          ).length;
        }
      },
      nasa_tlx
    ],
    timeline_variables: selected_videos
  };


  // 字幕の好みに関するアンケート
  const subtitle_preference_survey = {
    type: jsPsychSurveyHtmlForm,
    preamble: "<p>Please rank the three types of subtitles in order of preference <strong>(1 being the most preferred, 3 being the least preferred)</strong>. Each rank should be used exactly once:</p>",
    html: `
    <div>
      <label for="normal" style="color: red;">Regular subtitles (Normal): </label>
      <select id="normal" name="normal" required>
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
    <div>
      <label for="keyword" style="color: blue;">Keyword-only subtitles (Keyword): </label>
      <select id="keyword" name="keyword" required>
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
    <div>
      <label for="dynamik" style="color: green;">Emphasized keywords subtitles (Dynamik): </label>
      <select id="dynamik" name="dynamik" required>
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
    <div style="margin-top: 20px;">
      <label for="reason">Please explain the reason for your ranking:</label>
      <textarea id="reason" name="reason" rows="4" cols="50" required></textarea>
    </div>
  `,
    button_label: 'Submit',
    data: {
      task: 'subtitle_preference'
    },
    on_load: function () {
      const selects = document.querySelectorAll('select');
      selects.forEach(select => {
        select.addEventListener('change', function () {
          const selectedValues = Array.from(selects).map(s => s.value).filter(v => v !== "");
          const uniqueValues = new Set(selectedValues);
          if (selectedValues.length !== uniqueValues.size) {
            alert("Please use each rank (1, 2, 3) exactly once.");
            this.value = "";
          }
        });
      });
    },
    on_finish: function (data) {
      const responses = Object.values(data.response);
      const rankResponses = responses.slice(0, 3);  // 最初の3つの応答（ランキング）
      const reasonResponse = responses[3];  // 4番目の応答（理由）
      if (new Set(rankResponses).size !== 3 || rankResponses.includes("")) {
        alert("Please rank all subtitle types using each rank (1, 2, 3) exactly once before submitting.");
        this.repeat_trial();
      } else if (reasonResponse.trim() === "") {
        alert("Please provide a reason for your ranking.");
        this.repeat_trial();
      }
    }
  };

  const final_feedback = {
    type: jsPsychSurveyText,
    questions: [
      {
        prompt: "Please share your overall thoughts about the experiment:",
        rows: 5,
        columns: 50,
        required: false
      }
    ],
    data: {
      task: 'final_feedback'
    },
    on_load: function () {
      const textarea = document.querySelector('textarea');
      const maxLength = 1000; // 最大文字数を設定

      textarea.addEventListener('input', function () {
        // 入力文字数を制限
        if (this.value.length > maxLength) {
          this.value = this.value.slice(0, maxLength);
        }

        // 残り文字数を表示
        const remainingChars = maxLength - this.value.length;
        let remainingCharsDisplay = document.getElementById('remaining-chars');
        if (!remainingCharsDisplay) {
          remainingCharsDisplay = document.createElement('div');
          remainingCharsDisplay.id = 'remaining-chars';
          this.parentNode.insertBefore(remainingCharsDisplay, this.nextSibling);
        }
        remainingCharsDisplay.textContent = `Remaining characters: ${remainingChars}`;
      });
    },
    on_finish: function (data) {
      // 入力をサニタイズ
      const sanitizedInput = DOMPurify.sanitize(data.response.Q0);

      // HTMLエンティティをエスケープ
      const escapedInput = escapeHTML(sanitizedInput);

      // サニタイズされた入力で元のレスポンスを上書き
      data.response.Q0 = escapedInput;
    }
  };

  // HTMLをエスケープする関数
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // DOMPurifyライブラリを読み込む
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.3.3/purify.min.js';
  document.head.appendChild(script);


  // データの保存設定
  // const csv_filename = `${subject_id}.csv`;
  const json_filename = `${subject_id}.json`;
  const save_data_osf = {
    timeline: [
      // {
      //   type: jsPsychPipe,
      //   action: "save",
      //   experiment_id: "TBg2nxpISAoQ",
      //   filename: csv_filename,
      //   data_string: () => jsPsych.data.get().csv()
      // },
      {
        type: jsPsychPipe,
        action: "save",
        experiment_id: "TBg2nxpISAoQ",
        filename: json_filename,
        data_string: () => jsPsych.data.get().json(),
        data_format: 'json'
      }
    ]
  };

  // データをローカルに保存
  const save_data_locally = {
    type: jsPsychCallFunction,
    func: function (data) {
      // let csvData = jsPsych.data.get().csv();
      let jsonData = JSON.stringify(jsPsych.data.get());

      // CSV保存
      // let csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      // let csvUrl = URL.createObjectURL(csvBlob);
      // let csvLink = document.createElement("a");
      // csvLink.href = csvUrl;
      // csvLink.download = `./exp_data/${subject_id}.csv`;
      // csvLink.click();

      // JSON保存
      let jsonBlob = new Blob([jsonData], { type: 'application/json' });
      let jsonUrl = URL.createObjectURL(jsonBlob);
      let jsonLink = document.createElement("a");
      jsonLink.href = jsonUrl;
      jsonLink.download = `../exp_data/${subject_id}.json`;
      jsonLink.click();
    }
  };

  //実験終了画面
  function getCompletionCode(cnn_correct_ratio, allDummyCorrect, consented) {
    if (!consented) return 'CLIBK86T';
    if (!allDummyCorrect) return 'CJ73C0P5';
    if (cnn_correct_ratio >= 0.8) return 'C88OJ915';
    return 'C9IQ6OIZ';
  }

  const end_screen = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      const cnn_correct_ratio = jsPsych.data.get().filter({ task: 'cnn_video_questions' }).select('correct').mean();
      const dummyResponses = jsPsych.data.get().filter({ has_dummy: true });
      const allDummyCorrect = dummyResponses.values().every(trial => trial.dummy_correct === true);

      // 同意画面のデータ取得を修正
      const consentData = jsPsych.data.get().filter({ task: 'consent' }).values()[0];
      const consented = consentData ? consentData.response === 0 : true;  // データがない場合はデフォルトで同意したとみなす

      const completion_code = getCompletionCode(cnn_correct_ratio, allDummyCorrect, consented);

      return `
        <h2>Experiment Completed</h2>
        <p>Your data has been successfully submitted.</p>
        <p>Your completion code is: ${completion_code}</p>
        <p>Thank you for your participation!</p>
      `;
    },
    choices: "NO_KEYS"
  };


  // 実験の全体的な流れを定義
  const timeline = [
    add_subject_id,
    consent_screen,
    welcome,
    demographic_survey,
    toefl_preparation,
    toefl_listening,
    video_trial_instruction,
    video_trial,
    subtitle_preference_survey,
    final_feedback,
    save_data_osf,
    // save_data_locally,
    end_screen
  ];

  // console.log('experiment.js: Experiment timeline created:', timeline);
  return timeline;
}
