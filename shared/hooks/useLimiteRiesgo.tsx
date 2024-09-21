import { useCallback } from 'react';

import {
  ILimiteRiesgoByScoringGet,
  ILimiteRiesgoByScoringGetP,
} from '@shared/interfaces/api/ILimiteRiesgo';
import notifications from '@shared/utils/notifications';

import { limiteRiesgo } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useLimiteRiesgo = () => {
  const { get: getLimiteRiesgo } = useFetch(limiteRiesgo);
  const { newCancelToken } = useCancelToken();

  const limiteRiesgoByScoringGet = useCallback(
    async (scoring: number): ILimiteRiesgoByScoringGetP => {
      const query = `/by-scoring/${scoring}`;
      let res;
      try {
        res = await getLimiteRiesgo<ILimiteRiesgoByScoringGet>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ILimiteRiesgoByScoringGetP);
    },
    [getLimiteRiesgo, newCancelToken]
  );

  return { limiteRiesgoByScoringGet };
};

export default useLimiteRiesgo;
