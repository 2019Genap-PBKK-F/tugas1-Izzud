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
          'id': 0,
          'nrp': null,
          'nama': null,
          'angkatan': null,
          'gender': null,
          'dob': null,
          'photo': null,
          'active': null
        }
      ],
      template: {
        'id': 0,
        'nrp': null,
        'nama': null,
        'angkatan': null,
        'gender': null,
        'dob': null,
        'photo': null,
        'active': null
      }
    }
  },
  computed: {
    jExcelOptions() {
      return {
        data: this.bio,
        columns: [
          { type: 'hidden', title: 'ID', width: '120px', name: 'id' },
          { type: 'numeric', title: 'NRP', width: '120px', name: 'nrp' },
          { type: 'text', title: 'Nama', width: '120px', name: 'nama' },
          { type: 'numeric', title: 'Angkatan', width: '120px', name: 'angkatan' },
          { type: 'text', title: 'Jenis Kelamin', width: '120px', name: 'gender' },
          { type: 'text', title: 'Tanggal lahir', width: '250px', name: 'dob' },
          { type: 'image', title: 'Photo', width: '120px', name: 'photo' },
          { type: 'checkbox', title: 'Aktif', width: '80px', name: 'active' }
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
      console.log(host + '/api/mahasiswa')
      axios.get(host + '/api/mahasiswa').then(response => {
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

      var id = y + 1
      var data = {}
      axios.get(host + '/api/mahasiswa').then((response) => {
        console.log(response.data)
        data = Object.values(response.data[id])
        // var keys = Object.keys(this.template)
        // console.log('key: ' + keys)
        // console.log(temp.constructor)
        // var key = keys[x+1]
        console.log(value)

        data[x] = value
        console.log(data)
        axios({
          method: 'put',
          url: host + '/api/mahasiswa/' + data[0],
          data: {
            'id': data[0],
            'nrp': data[1],
            'nama': data[2],
            'angkatan': data[3],
            'gender': data[4],
            'dob': data[5],
            'photo': data[6],
            'active': data[7]
          }
        }).then((response) => {
          console.log(response.data)
        })
      })
    },
    insertedRow(instance) {
      axios({
        method: 'post',
        url: host + '/api/mahasiswa/',
        data: {
          'nrp': null,
          'nama': null,
          'angkatan': null,
          'gender': null,
          'dob': null,
          'photo': null,
          'active': null
        }
      }).then((response) => {
        console.log(response.data)
      })
    },
    deleteRow(instance, row) {
      axios.get(host + '/api/mahasiswa').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + '/api/mahasiswa/' + index[0])
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
