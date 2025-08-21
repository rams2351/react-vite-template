const Config = {
    PROJECT_ENV: import.meta.env.VITE_PROJECT_ENV || '',
    BASE_URL: import.meta.env.VITE_APP_BASE_URL || '',
    API_VERSION: import.meta.env.VITE_API_VERSION || '',
}

export default Config