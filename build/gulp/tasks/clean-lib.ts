'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as gulp from 'gulp';
import {BuildConfig} from '../../../config/build';
import {Utils} from '../utils';
import * as yargs from 'yargs';
let $: any = require('gulp-load-plugins')({ lazy: true });

/**
 * Removes all generated JavaScript from TypeScript used in the app as the gulp task 'clean-lib-ts'.
 * 
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Removes all generated JavaScript from TypeScript used in the app';

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all TypeScript files being removed'
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor() {
    super();
    Utils.log('Removing generated app JavaScript files from source tree');

    let options: gulp.SrcOptions = {
      read: false
    };

    // get all build JS files
    let tempFiles: string[] = BuildConfig.LIB_JS;
    // .. add output files
    tempFiles.push(BuildConfig.OUTPUT_PATH);
    // .. less the JS that should be kept
    BuildConfig.LIB_KEEP_JS.forEach((keepFile: string) => {
      tempFiles.push('!' + keepFile);
    });

    return gulp.src(tempFiles, options)
      .pipe($.if(this._args.verbose, $.print()))
      .pipe($.rimraf());
  }

}
