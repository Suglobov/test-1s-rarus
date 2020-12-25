import { mount } from '@vue/test-utils';
import App from '../src/vue/App.vue';
import axios from 'axios';


jest.mock('axios', () => ({
    get: () => Promise.resolve({
        data: {
            'ats-list': [
                {
                    name: 'Железная',
                    list: [
                        'Avaya IP Office',
                        'Cisco UCM',
                        'LG iPecs',
                        'Panasonic KX-TDA/TDE, КX-NS',
                        'Samsung OfficeServ',
                    ],
                },
            ],
        },
    }),
}));
// jest.mock('axios');

describe('Компонент App', () => {
    const wrapper = mount(App);

    it('есть хотя бы 1 атс', (done) => {
        // axios.mockResolvedValue({
        //     data: {
        //         'ats-list': [
        //             {
        //                 name: 'Железная',
        //                 list: [
        //                     'Avaya IP Office',
        //                     'Cisco UCM',
        //                     'LG iPecs',
        //                     'Panasonic KX-TDA/TDE, КX-NS',
        //                     'Samsung OfficeServ',
        //                 ],
        //             },
        //         ],
        //     },
        // });
        wrapper.vm.$nextTick(() => {
            const ats = wrapper.find('.ats-list__item');
            expect(ats.element instanceof Node).toBe(true);
            done();
        });
    });

    it('кнопка активна, только если выбрана атс', (done) => {
        const clearAtsButton = wrapper.find('.ats-list__clear');
        const button = wrapper.find('.button-step1');
        const ats = wrapper.find('.ats-list__item');
        clearAtsButton.trigger('click');
        expect(button.attributes().disabled).not.toBeUndefined();
        ats.trigger('click');

        wrapper.vm.$nextTick(() => {
            expect(button.attributes().disabled).toBeUndefined();
            done();
        });
    });
});


// describe('App.vue', () => {
//     it('123', () => {
//         const wrapper = mount(App);
//         wrapper.vm.$nextTick(() => {
//             console.log('wrapper.vm.atsList', wrapper.vm.atsList);
//             expect(wrapper.vm.atsList.length).toBe(1);
//         });
//     });
//     // it('mocking the axios call to get posts should work', () => {
//     //     const wrapper = shallowMount(Posts);
//     //     expect(wrapper.vm.posts.length).toBe(1);
//     // });
// });
