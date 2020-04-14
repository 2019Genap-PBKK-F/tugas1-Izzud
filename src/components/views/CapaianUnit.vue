<template lang='html'>
  <div class='wrapper-jexcel'>
    <br>
    <input
      type='button'
      value='Add new row'
      @click='jExcelObj.insertRow()'
    />
    <input
      type='button'
      value='Delete row'
      @click='jExcelObj.deleteRow()'
    />
    <br />
    <br />
    <div id='spreadsheet' ref='spreadsheet'></div>
  </div>
</template>

<script>
import 'jexcel/dist/jexcel.css' // eslint-disable-line no-unused-vars
import jexcel from 'jexcel' // eslint-disable-line no-unused-vars
import axios from 'axios'

var host = 'http://10.199.14.46:8007'

export default {
  name: 'jexcel',
  data() {
    return {
      bio: [
        {
          'DataDasar_id': 1,
          'Unit_id': 1,
          'waktu': null,
          'capaian': 0.0
        }
      ]
    }
  },
  computed: {
    jExcelOptions() {
      return {
        data: this.bio,
        columns: [
          { type: 'dropdown', title: 'Data Dasar', url: host + '/api/dasar', width: '300px' },
          { type: 'dropdown', title: 'Unit', url: host + '/api/unit-name', width: '300px' },
          { type: 'text', title: 'waktu', width: '300px' },
          { type: 'numeric', title: 'capaian', width: '300px' }
        ],
        onchange: this.changed,
        oninsertrow: this.insertedRow,
        ondeleterow: this.deleteRow,
        responsive: true
      }
    }
  },
  methods: {
    load() {
      console.log('load')
      console.log(host + '/api/capaian')
      axios.get(host + '/api/capaian').then(response => {
        console.log(response)
        var valuesOnly = response.data
        this.bio = valuesOnly
        console.log(this.bio)
      }).catch((err) => {
        console.log(err)
      })
    },
    changed(instance, cell, x, y, value) {
      x = parseInt(x)
      y = parseInt(y)

      console.log('x: ' + x + '\ny: ' + y)

      var id = y
      var data = {}
      var old = {}
      axios.get(host + '/api/capaian').then((response) => {
        data = Object.values(response.data[id])
        old = Object.values(response.data[id])

        data[x] = value
        console.log(data)
        console.log(old)
        axios({
          method: 'put',
          url: host + '/api/capaian/' + old[0] + '&' + old[1],
          data: {
            'DataDasar_id': data[0],
            'Unit_id': data[1],
            'waktu': data[2],
            'capaian': data[3]
          }
        }).then((response) => {
          console.log(response.data)
        })
      })
    },
    insertedRow(instance) {
      axios({
        method: 'post',
        url: host + '/api/capaian/',
        data: {
          'DataDasar_id': 1,
          'Unit_id': 1,
          'waktu': null,
          'capaian': 0.0
        }
      }).then((response) => {
        console.log(response.data)
      })
    },
    deleteRow(instance, row) {
      console.log(row)
      axios.get(host + '/api/capaian/').then(res => {
        console.log(res.data[row])
        var index = Object.values(res.data[row])
        // console.log(index)
        axios.delete(host + '/api/capaian/' + index[0] + '&' + index[1])
      })
    }
  },
  mounted() {
    this.load()
  },
  watch: {
    bio () {
      const jExcelObj = jexcel(this.$refs['spreadsheet'], this.jExcelOptions)
      Object.assign(this, { jExcelObj })
    }
  }
}
</script>

<style lang='css' scoped>
.introduction {
  font-size: 14px;
  padding: 0.5em;
  margin-bottom: 0.3em;
  color: gold;
  background: #111;
}
</style>
