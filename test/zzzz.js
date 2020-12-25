// import {
//     describe,
//     expect,
//     test,
// } from '@jest/globals';
import {
    mount,
    shallowMount,
} from '@vue/test-utils';


import flushPromises from 'flush-promises';

import App from '../src/vue/App.vue';

import Foo from './Foo';


jest.mock('axios', () => ({
    get: Promise.resolve('value'),
}));

// async () => {
//     const result = await new Promise.resolve('value');
//     console.log('result', result);
// };
test('fetches async when a button is clicked', async () => {
    const wrapper = shallowMount(Foo);
    wrapper.find('button').trigger('click');
    await flushPromises();
    // console.log(wrapper.html());
    expect(wrapper.text()).toBe('value');
});
// test('fetches async when a button is clicked', done => {
//     const wrapper = shallowMount(Foo);
//     wrapper.find('button').trigger('click');
//     wrapper.vm.$nextTick(() => {
//         expect(wrapper.text()).toBe('value');
//         done();
//     });
// });

// describe('Компонент App', () => {
//     const wrapper = mount(App);

//     it('есть хотя бы 1 атс', (done) => {
//         axios.get.mockResolvedValue({
//             'ats-list': [
//                 {
//                     name: 'Железная',
//                     list: [
//                         'Avaya IP Office',
//                         'Cisco UCM',
//                         'LG iPecs',
//                         'Panasonic KX-TDA/TDE, КX-NS',
//                         'Samsung OfficeServ',
//                     ],
//                 },
//             ],
//         });
//         wrapper.vm.$nextTick(() => {
//             const ats = wrapper.find('.ats-list__item');
//             console.log(wrapper.vm.atsList);
//             done();
//         });
//         // setTimeout(() => {
//         // }, 1000);
//     });
//     // it('кнопка активна, только если выбрана атс', () => {
//     //     const button = wrapper.find('.button-step1');
//     //     // expect(ats.element).not.toBeUndefined();
//     // });
// });
