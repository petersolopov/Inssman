import React, { useState, useEffect } from 'react';
import Input from 'src/options/components/common/input/input';
import { FormMode, IForm, MatchType, MatchTypeMap } from 'src/models/formFieldModel';
import { PostMessageAction } from 'src/models/postMessageActionModel';
import { addProtocol, backslashNumber } from 'src/options/utils';
import Form from '../components/form/form';
import SourceFields from '../components/source/sourceFields';
import RuleActionType = chrome.declarativeNetRequest.RuleActionType

const RedirectForm = ({ onSave, mode, id, error }) => {
  const [destination, setDestination] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [matchType, setMatchType] = useState<MatchType>(MatchType.CONTAIN);
  const [title, setTitle] = useState<string>('');
  const onChangeSource = event => setSource(event.target.value);
  const onChangeDestination = event => setDestination(event.target.value);
  const onChangeMatchType = event => setMatchType(event.target.value);
  const onChangeTitle = event => setTitle(event.target.value);
  const onSubmit = () => {
    const form: IForm = {
      data: {
        rule: {
          action: {
            type: RuleActionType.REDIRECT,
            redirect: {
              [destination.match(backslashNumber) ? 'regexSubstitution' : 'url']: addProtocol(destination),
            }
          },
          condition: {
            [MatchTypeMap[matchType]]: source
          }
        },
        ruleData: {
          title,
          source,
          destination,
          matchType,
          url: 'redirect',
        },
      }
    };
    onSave(form);
  };

  useEffect(() => {
    if(mode === FormMode.UPDATE) {
      chrome.runtime.sendMessage({
        action: PostMessageAction.GetRuleById,
        id,
      }, ({ruleData}) => {
        setDestination(ruleData.destination);
        setSource(ruleData.source);
        setMatchType(ruleData.matchType);
        setTitle(ruleData.title)
      });
    }
  }, []);

  return <>
          <Form onSubmit={onSubmit} mode={mode}>
            <div className="w-1/5">
              <Input
                  value={title}
                  name='title'
                  onChange={onChangeTitle} 
                  placeholder="Rule Title"
              />
            </div>
            <div className="flex mt-5 items-center w-full">
              <SourceFields
                matchType={matchType}
                onChangeMatchType={onChangeMatchType}
                source={source}
                onChangeSource={onChangeSource}
              />
            </div>
            <div className="flex mt-5 items-center">
              <div className="min-w-[100px]">Redirect to</div>
                <div className="w-1/3">
                  <Input
                    value={destination}
                    name='destination'
                    onChange={onChangeDestination} 
                    placeholder='http://example.com'
                  />
                </div>
            </div>
           </Form>
    </>
};

export default RedirectForm;