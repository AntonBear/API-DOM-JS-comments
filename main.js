'use strict'
import { showLoader, hideLoader } from './utils.js'
import { fetchAndRenderData } from './fetchAndRenderData.js'


async function initApp() {
  try {
    showLoader()
    await fetchAndRenderData()
  } catch (error) {
    console.error('Критическая ошибка приложения:', error)
  } finally {
    hideLoader()
  }
}

initApp()
