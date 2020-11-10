import React from "react";
// import json_temp_data from "./temp_data.json";

let temp_data = {
  links: {
    1: {
      type: "FAIL_FORWARD", // basic,
      from: ["LGQZI6"],
      to: ["RGPT60"],
      conditionals: {
        RGPT60: [{ type: "Chance", val: 0.2 }],
      },
      var: {
        index: 0,
        resources: 0,
      },
    },
  },
  components: {
    LGQZI6: {
      label: "Win Match",
      id: "LGQZI6",
      resourceType: "",
      order: 1,
      var: {
        output: 1,
        generates: 1,
        allowNegative: false,
        isSource: true,
        behavior: "Auto",
        resources: 0,
      },
    },
    RGPT60: {
      label: "Matches Won",
      id: "RGPT60",
      resourceType: "",
      order: 1,
      var: {
        output: 1,
        allowNegative: false,
        generates: 1,
        isSource: false,
        behavior: "Auto",
        resources: 0,
      },
    },
  },
};

class Logic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.temp_data = temp_data;
    this.resources_in_transit = [];
  }

  // Loop Through Links.
  // Verify that from and to have valid components connected.
  // Verify that link conditions for resource transfer are met for each component.
  // Transfer resources if everything checks out.

  preTickLogic() {
    let components = this.temp_data.components;
    for (let comp_id in components) {
      if (components[comp_id].var.isSource) {
        let comp = components[comp_id];
        this.sendResoucesTo(comp.id, comp.var.generates);
      }
    }
  }

  linkTickLogic(link_id) {
    // console.log(link);
    let link = this.temp_data.links[link_id];
    // let instructions = { sendTo: [], sendFrom: [], linkSuccess: true };

    if (!link) return { linkSuccess: false };

    switch (link.type) {
      case "BASIC":
        // Verify conditions met for link to component transfer.
        if (this.checkLinkConditionals(link, link.to[link.var.index]).success) {
          this.sendResoucesTo(
            link.to[link.var.index],
            this.getResourcesToSend(link)
          );
          // Add 1 to index if there is an index after our current location. Otherwise reset to 0 for next tick.
          link.var.index =
            link.var.index + 1 > link.to.length - 1 ? 0 : link.var.index + 1;
        }
        break;
      case "FAIL_FORWARD":
        this.failForwardRecursive(link);
        break;
      case "SPLIT_SHARE":
      case "SPLIT_MULT":
        // If type is SPLIT_SHARE, divide ammount by number of receivers.. Otherwise divide by 1.
        // Share (*), Mult (**) in syntax
        let ammount =
          this.getResourcesToSend(link) /
          (link.type.split("_")[1] == "SHARE" ? link.to.length : 1);
        for (var i = 0; i < link.to.length; i++) {
          // Verify conditions met for link to component transfer per component.
          // No conditions yet though so just send it.
          this.sendResoucesTo(link.to[link.var.index], ammount);
        }
        break;
      default:
        console.error(`ERROR: ${link.id} does not have a valid type!`);
        break;
    }
  }

  checkLinkConditionals(link, comp_id) {
    let comp = this.temp_data.components[comp_id];
    if (link.conditionals[comp.id]) {
      for (var i = 0; i < link.conditionals[comp.id].length; i++) {
        let condition = link.conditionals[comp.id][i];
        switch (condition.type) {
          case "Chance":
            let generated = Math.random();
            // console.log(generated);
            return { success: generated < condition.val };
          default:
            console.error(
              `ERROR: ${link.id} has invalid condition for ${comp.id} (${condition.type})!`
            );
            return { success: false };
        }
      }
    }
  }

  failForwardRecursive(link) {
    let starting = link.var.index;
    let index = starting;
    let firstPass = false;
    let check = this.checkLinkConditionals(link, link.to[index]);
    if (check.success) {
      this.sendResoucesTo(link.to[index], this.getResourcesToSend(link));
      link.var.index = 0;
    } else {
      if (!firstPass) {
        firstPass = true;
      } else {
        if (link.to.length > index - 1) {
          index += 1;
        } else {
          index = 0;
        }
        if (index == starting) {
          return -1;
        } else {
          this.failForwardRecursive();
        }
      }
    }
  }

  getResourcesToSend(link, deduct = true) {
    const components = this.temp_data.components;
    let num = 0;
    for (var i = 0; i < link.from.length; i++) {
      let comp = components[link.from[i]];
      num += comp.var.output;
      if (deduct) this.sendResoucesTo(comp.id, -comp.var.output);
    }
    return num;
  }

  sendResoucesTo(target, ammount = 1) {
    let components = this.temp_data.components;
    components[target].var.resources += ammount;
  }

  componentDidMount() {
    setInterval(() => {
      // console.log("^^^^^^^^^^^^^^^^^^^^");
      // console.log(this.temp_data);
      let components = this.temp_data.components;
      this.preTickLogic();

      let links = this.temp_data.links;
      for (let link_id in links) {
        this.linkTickLogic(link_id);
      }

      for (let comp_id in components) {
        let comp = components[comp_id];
        console.log(`${comp.id}... resources: ${comp.var.resources}`);
      }
      console.log("==============");
    }, 1000);
  }

  componentWillUnmount() {}

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}

export default Logic;
