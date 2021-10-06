import { useAbstractMutation } from './use-abstract-mutation';
import { useNetwork } from './use-network';
import fs from 'file-saver';
import { JsonService } from '@/services/json';

export const useExportJobsMutation = () => {
  const { queries } = useNetwork();
  const mutation = useAbstractMutation({
    mutation: queries.getJobsForExport,
    onSuccess({ jobs }) {
      const normalizedJobs = jobs.map((job) => ({
        ...job,
        opts: JsonService.maybeParse(job.opts),
        data: JsonService.maybeParse(job.data),
        returnValue: JsonService.maybeParse(job.returnValue),
      }));
      const blob = new Blob([JSON.stringify(normalizedJobs, null, 2)], {
        type: 'application/json',
      });
      fs.saveAs(blob, 'bull-jobs.json');
    },
  });
  return mutation;
};
