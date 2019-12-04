import React, { useState } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import TranscriptionEditor from './transcription-page/TranscriptionEditor';
import TranscriptionDescription from './transcription-page/TranscriptionDescription';
import ExportButtons from './transcription-page/ExportButtons';

import { Languages, Result } from '../constants/Interfaces';
import Template from '../constants/Template';
import { capitalizeFirstLetter } from '../util/StringHelper';
import './TranscriptionPage.scss';
import Navbar from './header/Navbar';
import Footer from './footer/Footer';

type Props = {
  language: string;
};

const TranscriptionPage: React.FC<RouteComponentProps<Props>> = ({
  match: {
    params: { language },
  },
}) => {
  const [result, setResult] = useState<Result>(Template.Result);

  // French Transcription Options
  const [shouldAnalyzeElision, setShouldAnalyzeElision] = useState(true);
  const [shouldAnalyzeLiason, setShouldAnalyzeLiason] = useState(true);

  if (capitalizeFirstLetter(language) in Languages) {
    return (
      <>
        <div className='ipa__transcription__container'>
          <TranscriptionDescription
            language={language}
            shouldAnalyzeElision={shouldAnalyzeElision}
            setShouldAnalyzeElision={setShouldAnalyzeElision}
            shouldAnalyzeLiason={shouldAnalyzeLiason}
            setShouldAnalyzeLiason={setShouldAnalyzeLiason}
          />
          <TranscriptionEditor
            language={language}
            shouldAnalyzeElision={shouldAnalyzeElision}
            shouldAnalyzeLiason={shouldAnalyzeLiason}
            result={result}
            setResult={setResult}
          />
          <ExportButtons language={language} result={result} />
        </div>
        <Footer />
      </>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default TranscriptionPage;
