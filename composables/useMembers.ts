import type {TMember} from "~/types/member";
import {useLazyFetch} from "#app";

export const useMembers = (pageSize: number) => {
    const currentPage = useState('actualPage', () => 1);
    const lastPage = useState('lastPage', () => 1);
    const members = useState<Array<TMember>>('members', () => []);
    const organization = useState('organization', () => 'lemoncode');

    const response = useLazyFetch<Array<TMember>, Error>(() => `https://api.github.com/orgs/${organization.value}/members`, {
        query: computed(() => ({
            per_page: pageSize,
            page: currentPage.value
        })),
        onResponse: context => {
            const link = context.response.headers.get('link')?.match(/(\d+)(?=>; rel="last")/g) ?? [];
            lastPage.value = Number(link[0] ?? 1);
        },
        watch: [currentPage, organization]
    });
    response.then(value => members.value = value?.data.value ?? []);

    watch(response.data, value => members.value = value ?? []);

    return {
        currentPage,
        lastPage,
        members,
        organization,
        pending: response.pending,
        error: response.error
    };
}