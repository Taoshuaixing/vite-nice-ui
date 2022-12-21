import Axios, {
	AxiosInstance,
	AxiosRequestConfig,
	CustomParamsSerializer,
} from 'axios';
import {
	PureHttpError,
	RequestMethods,
	PureHttpResponse,
	PureHttpRequestConfig,
} from './types.d';

import { stringify } from 'qs';
import NProgress from '../progress';
import { getToken, formatToken } from '@/utils/auth';
import { useUserStoreHook } from '@/store/modules/user';
