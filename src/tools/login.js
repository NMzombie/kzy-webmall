import AccountLogic from '@/logic/account'
export default {
    login: AccountLogic.login,
    clearLoginUserInfo: AccountLogic.cleanContext,
}
