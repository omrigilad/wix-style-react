import queryString from 'query-string';
import { createStoryUrl as originalCreateStoryUrl } from 'wix-ui-test-utils/protractor';
import {
  TESTS_PREFIX,
  RTL_QUERY_PARAM_NAME,
} from '../../stories/storiesHierarchy';

export const createStoryUrl = ({ kind, story, withExamples, rtl }) => {
  const baseUrl = originalCreateStoryUrl({
    kind,
    story,
    withExamples,
  });
  const params = queryString.stringify({ [RTL_QUERY_PARAM_NAME]: rtl });
  return params ? `${baseUrl}&${params}` : baseUrl;
};

export const createTestStoryUrl = ({ testName, category, storyName, rtl }) => {
  return createStoryUrl({
    kind: `${TESTS_PREFIX}/${category}/${storyName}`,
    story: testName,
    rtl,
  });
};
