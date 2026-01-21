# decision-app
NextStep - AI powered decision app 
A React-based web application that helps users make better decisions by leveraging AI to analyze their priorities and provide personalized recommendations.

Youtube Link: https://youtu.be/tM5qXshLvfM

Features

- **Step-by-step decision flow** - Guided 4-step process to capture decision context
- **AI-powered recommendations** - Personalized suggestions based on your priorities
- **Multiple categories** - Career, Personal, Financial, Health, Education, and Custom
- **Custom factors & options** - Add your own decision criteria and choices
- **Visual scoring** - Clear percentage-based scoring for each recommendation
- **Pros & cons analysis** - Detailed breakdown of each option
- **Key insights** - AI-generated insights about your decision-making process
- **Mobile-first design** - Responsive interface optimized for phone use
- **Smooth animations** - Polished transitions between screens
- **Bottom navigation** - Easy access to all app sections

  ### Using the Application
  Connect to private server: http://157.180.39.234:5173/
  Make sure you are using a mobile device. If app is used in Browser, change viewport to a mobile device.

### Technical Limitations

1. **API Dependency**
   - Requires active internet connection
   - Depends on OpenRouter API availability
   - Subject to API rate limits and pricing

2. **No Persistent Storage**
   - Decisions are not saved between sessions
   - Refreshing the page loses all progress
   - No decision history or past recommendations

3. **No Authentication**
   - All users share the same app instance
   - No user accounts or profiles
   - Cannot track individual usage

4. **Single Decision at a Time**
   - Cannot compare multiple decisions side-by-side
   - Must complete or abandon current decision before starting new one
   - No way to save decisions for later review

5. **Limited Offline Capability**
   - App loads offline but cannot generate recommendations
   - No offline caching of previous results
   - Requires API call for every decision

6. **Browser Compatibility**
   - Optimized for modern browsers (Chrome, Firefox, Safari, Edge)
   - May have issues on Internet Explorer
   - Best experience on mobile Safari/Chrome

### AI Limitations

1. **Response Quality**
   - Quality depends on user input detail
   - Generic input = generic recommendations
   - Cannot ask clarifying questions

2. **Response Time**
   - Takes 5-15 seconds per decision
   - Varies based on API load and model chosen
   - No option to cancel once submitted

3. **No Memory**
   - AI doesn't remember previous decisions
   - Each request is independent
   - Cannot reference past conversations

4. **Language Support**
   - Optimized for English
   - May work with other languages but not tested
   - Response quality varies by language

### UX Limitations

1. **No Decision Export**
   - Cannot download or print recommendations
   - Cannot share results via link
   - Must screenshot to save

2. **No Feedback Loop**
   - FeedbackScreen exists but data not stored
   - Cannot improve recommendations based on user feedback
   - No way to report bad recommendations

3. **No Undo**
   - Cannot undo selecting a recommendation
   - Must use "Back" to review other options
   - Confirming selection requires going through flow again

4. **Mobile-First Design**
   - Desktop experience is functional but not optimized
   - Best viewed in phone-sized viewport
   - Some UI elements sized for touch, not mouse

### Data Privacy Limitations

1. **API Data Sharing**
   - All decision data sent to OpenRouter/AI provider
   - Subject to OpenRouter's privacy policy
   - No end-to-end encryption

2. **No Data Deletion**
   - Cannot delete data from API provider
   - Data retention per OpenRouter's policies
  

3. **API Key Exposure**
   - API key visible in browser dev tools if not using backend
   - Anyone can see network requests
   - Recommend backend proxy for production

  
   ### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations

### Backend/API
- **OpenRouter API** - AI model access
- **Fetch API** - HTTP requests

### Development Tools
- **Node.js** - Runtime environment
- **npm** - Package manager
