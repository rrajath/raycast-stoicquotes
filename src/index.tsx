import { Action, ActionPanel, Detail } from "@raycast/api";
import { useFetch } from "@raycast/utils";

type StoicQuote = {
  id: number,
  author_id: number,
  body: string,
  author: string,
};

export default function Command() {
  const { isLoading, data, revalidate } = useFetch<StoicQuote>('https://stoicquotesapi.com/v1/api/quotes/random', {
    keepPreviousData: false,
    headers: {
      Accept: 'application/json',
    }
  });

  const stoicQuote = !isLoading && data ? data : "Loading...";
  return (
    <Detail
      isLoading={isLoading}
      markdown={`# ${data?.body}\n~ ${data?.author}`}
      actions={
        <ActionPanel>
          <Action title="New Quote" onAction={revalidate} />
        </ActionPanel>
      }
      />
  );
}
