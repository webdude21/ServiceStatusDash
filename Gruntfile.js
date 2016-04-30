'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      root: 'src',
      src: '<%= project.root %>/scripts',
      libs: '<%= project.root %>/lib',
      css: '<%= project.root %>/styles',
    },
    compress: {
      main: {
        options: {
          archive: '<%= pkg.name %>.zip'
        },
        files: [
          { expand: true, cwd: '<%= project.root %>', src: ['**/*'], dest: '/' }
        ]
      }
    },
    eslint: {
      app: ['<%= project.src %>/**/*.js']
    },
    clean: {
      zip: {
        srt: ['<%= pkg.name %>.zip']
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.registerTask('default', ['eslint', 'clean', 'compress']);
};
