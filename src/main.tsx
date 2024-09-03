import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import MuiReactTable from './components/mui-table';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoryCreationForm from './components/story';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MuiReactTable />} />
        <Route path="/create-story" element={<StoryCreationForm />} />
        <Route path="*" element={<h1>Page Note Found: 4O4</h1>} />
      </Routes>
    </Router>
  </StrictMode>,
);
